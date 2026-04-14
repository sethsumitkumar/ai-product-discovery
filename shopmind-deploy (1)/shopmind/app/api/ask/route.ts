import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "query field is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "LLM service is not configured. Please set OPENROUTER_API_KEY." },
        { status: 503 }
      );
    }

    // Build product context for the prompt
    const productContext = products
      .map(
        (p) =>
          `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: $${p.price} | Tags: ${p.tags.join(", ")} | Description: ${p.description}`
      )
      .join("\n");

    const systemPrompt = `You are a helpful product discovery assistant for a tech store. 
You will be given a user query and a list of products. Your job is to:
1. Understand the user's intent (e.g., budget constraint, use case, category)
2. Return the most relevant product IDs
3. Provide a short, friendly summary of what you found

You MUST respond with ONLY valid JSON in this exact shape:
{
  "productIds": ["p1", "p3"],
  "summary": "Here are some great budget options for students...",
  "intent": "budget laptops for students"
}

Rules:
- productIds must be from the provided list only
- summary should be 1-2 sentences, friendly and helpful
- intent is a short description of what the user wants
- If no products match, return empty productIds array and explain in summary
- Do NOT include any text outside the JSON object`;

    const userPrompt = `User query: "${query.trim()}"

Available products:
${productContext}

Return the matching product IDs and a helpful summary as JSON.`;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://product-discovery.vercel.app",
        "X-Title": "Product Discovery AI",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("OpenRouter error:", response.status, errorText);

      if (response.status === 401) {
        return NextResponse.json(
          { error: "AI service authentication failed. Please check the API key." },
          { status: 502 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: "AI service rate limit reached. Please try again in a moment." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "AI service is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const llmData = await response.json();
    const rawContent = llmData?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        { error: "Received an empty response from the AI service." },
        { status: 502 }
      );
    }

    // Parse LLM JSON response (strip markdown fences if present)
    let parsed: { productIds: string[]; summary: string; intent?: string };
    try {
      const cleaned = rawContent.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse LLM response:", rawContent);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 502 }
      );
    }

    // Validate and resolve product IDs to full product objects
    const validIds = (parsed.productIds || []).filter((id) =>
      products.some((p) => p.id === id)
    );
    const matchedProducts = validIds.map((id) => products.find((p) => p.id === id)!);

    return NextResponse.json({
      products: matchedProducts,
      productIds: validIds,
      summary: parsed.summary || "Here are the results for your query.",
      intent: parsed.intent || query,
      total: matchedProducts.length,
    });
  } catch (error: unknown) {
    console.error("Ask endpoint error:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "The AI service timed out. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
