import authOptions from "@/app/auth/authOptions";
import { createIssueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } 

  const body = await request.json();
  // Validate the incoming request body
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
}
