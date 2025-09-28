import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing Bearer token" },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (token !== env.SCADA_IAM_TOKEN) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json(
      { error: "Missing query param: customer_id" },
      { status: 400 }
    );
  }

  // Mock OPC-style customer assets
  const mockCustomers = [
    {
      customer_id: "vaasan-sähkö-123",
      assets: [
        {
          node_id: "A1.STATUS", // OPC node
          value: 1, // 1 = online, 0 = offline
          quality: "GOOD",
          timestamp: new Date().toISOString(),
        },
        {
          node_id: "A2.STATUS",
          value: 0,
          quality: "GOOD",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      customer_id: "helsinki-energy-456",
      assets: [
        {
          node_id: "B1.STATUS",
          value: 1,
          quality: "GOOD",
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ];

  const customerData = mockCustomers.find(
    c => c.customer_id === customerId
  );

  if (!customerData) {
    return NextResponse.json(
      { error: `Customer not found: ${customerId}` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    customer_id: customerData.customer_id,
    assets: customerData.assets,
  });
}
