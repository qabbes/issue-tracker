import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the incoming request body
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}