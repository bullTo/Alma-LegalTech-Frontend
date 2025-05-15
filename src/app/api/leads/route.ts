import { NextResponse } from 'next/server';
import data from "@/utils/data.json"
// Mock data (replace with a database in production)
let leads = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', status: 'PENDING' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', status: 'PENDING' }
];

// GET /api/leads - Fetch all leads
export async function GET() {
  return NextResponse.json(data);
}

// PUT /api/leads/:id - Update lead status
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/').pop() || '', 10);
    const { status } = await request.json();

    leads = leads.map((lead) =>
      lead.id === id ? { ...lead, status: status || lead.status } : lead
    );

    return NextResponse.json({ message: 'Lead updated successfully.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 });
  }
}
