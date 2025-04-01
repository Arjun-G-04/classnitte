import { attendance } from "../../../../drizzle/schema/attendance";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../../../drizzle/index";

export async function POST(req: NextRequest) {
	const { userId, classId, date, status } = await req.json();
	console.log("userId", userId);
	console.log("classId", classId);
	console.log("date", date);
	console.log("status", status);

	if (!userId || !classId || !date) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	await db.insert(attendance).values({
		userId,
		classId,
		date: new Date(date).toISOString().split("T")[0],
		status,
	});

	return NextResponse.json({ message: "Attendance marked successfully" });
}
