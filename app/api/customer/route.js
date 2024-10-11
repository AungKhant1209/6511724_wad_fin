import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();
  const customers = await Customer.find();
  return new Response(JSON.stringify(customers), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const newCustomer = new Customer(body);
  await newCustomer.save();
  return new Response(JSON.stringify(newCustomer), { status: 201 });
}
