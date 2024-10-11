import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
  await dbConnect();
  const customer = await Customer.findById(params.id);
  if (!customer) return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
  return new Response(JSON.stringify(customer), { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const deletedCustomer = await Customer.findByIdAndDelete(params.id);
  if (!deletedCustomer) return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
  return new Response(JSON.stringify({ message: "Customer deleted successfully" }), { status: 200 });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const body = await request.json();
  const updatedCustomer = await Customer.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedCustomer) return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
  return new Response(JSON.stringify(updatedCustomer), { status: 200 });
}
