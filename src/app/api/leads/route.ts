import { NextResponse } from "next/server";

// Mock data (replace with a database in production)
interface Lead {
  id: number;
  name: string;
  email: string;
  linkedin: string;
  resume: string;
  visa: string;
  status: string;
  country: string;
  additional: string;
  date: string;
}

let leads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@test.com",
    linkedin: "https://www.linkedin.com/in/johndoe",
    resume: "johndoe.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "USA",
    additional: "Okay yes",
    date: "05/15/2025, 2:45 PM",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@test.com",
    linkedin: "https://www.linkedin.com/in/janesmith",
    resume: "janesmith.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Canada",
    additional: "Looking for O-1 options.",
    date: "05/15/2025, 2:50 PM",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@test.com",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
    resume: "alicejohnson.pdf",
    visa: "EB-1A",
    status: "Reached Out",
    country: "UK",
    additional: "Interested in EB-1A.",
    date: "05/15/2025, 3:00 PM",
  },
  {
    id: 4,
    name: "Bob Lee",
    email: "bob.lee@test.com",
    linkedin: "https://www.linkedin.com/in/boblee",
    resume: "boblee.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "India",
    additional: "Currently on H-1B.",
    date: "05/15/2025, 3:05 PM",
  },
  {
    id: 5,
    name: "Carol White",
    email: "carol.white@test.com",
    linkedin: "https://www.linkedin.com/in/carolwhite",
    resume: "carolwhite.pdf",
    visa: "E-2",
    status: "Pending",
    country: "Germany",
    additional: "Interested in investment visas.",
    date: "05/15/2025, 3:10 PM",
  },
  {
    id: 6,
    name: "David James",
    email: "david.kim@test.com",
    linkedin: "https://www.linkedin.com/in/davidkim",
    resume: "davidkim.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "South Africa",
    additional: "PhD in engineering.",
    date: "05/15/2025, 3:15 PM",
  },
  {
    id: 7,
    name: "Emily Brown",
    email: "emily.brown@test.com",
    linkedin: "https://www.linkedin.com/in/emilybrown",
    resume: "emilybrown.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Australia",
    additional: "Award-winning artist.",
    date: "05/15/2025, 3:20 PM",
  },
  {
    id: 8,
    name: "Frank Green",
    email: "frank.green@test.com",
    linkedin: "https://www.linkedin.com/in/frankgreen",
    resume: "frankgreen.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "France",
    additional: "Published author.",
    date: "05/15/2025, 3:25 PM",
  },
  {
    id: 9,
    name: "Grace Lee",
    email: "grace.lee@test.com",
    linkedin: "https://www.linkedin.com/in/gracelee",
    resume: "gracelee.pdf",
    visa: "H-1B",
    status: "Reached Out",
    country: "China",
    additional: "Software engineer.",
    date: "05/15/2025, 3:30 PM",
  },
  {
    id: 10,
    name: "Henry Adams",
    email: "henry.adams@test.com",
    linkedin: "https://www.linkedin.com/in/henryadams",
    resume: "henryadams.pdf",
    visa: "E-2",
    status: "Pending",
    country: "Japan",
    additional: "Entrepreneur.",
    date: "05/15/2025, 3:35 PM",
  },
  {
    id: 11,
    name: "Ivy Chen",
    email: "ivy.chen@test.com",
    linkedin: "https://www.linkedin.com/in/ivychen",
    resume: "ivychen.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "Taiwan",
    additional: "Research scientist.",
    date: "05/15/2025, 3:40 PM",
  },
  {
    id: 12,
    name: "Jack Black",
    email: "jack.black@test.com",
    linkedin: "https://www.linkedin.com/in/jackblack",
    resume: "jackblack.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Brazil",
    additional: "Musician.",
    date: "05/15/2025, 3:45 PM",
  },
  {
    id: 13,
    name: "Karen Miller",
    email: "karen.miller@test.com",
    linkedin: "https://www.linkedin.com/in/karenmiller",
    resume: "karenmiller.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "Mexico",
    additional: "Business executive.",
    date: "05/15/2025, 3:50 PM",
  },
  {
    id: 14,
    name: "Leo Turner",
    email: "leo.turner@test.com",
    linkedin: "https://www.linkedin.com/in/leoturner",
    resume: "leoturner.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "USA",
    additional: "IT consultant.",
    date: "05/15/2025, 3:55 PM",
  },
  {
    id: 15,
    name: "Mona Patel",
    email: "mona.patel@test.com",
    linkedin: "https://www.linkedin.com/in/monapatel",
    resume: "monapatel.pdf",
    visa: "E-2",
    status: "Pending",
    country: "India",
    additional: "Investor.",
    date: "05/15/2025, 4:00 PM",
  },
  {
    id: 16,
    name: "Nina Scott",
    email: "nina.scott@test.com",
    linkedin: "https://www.linkedin.com/in/ninascott",
    resume: "ninascott.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "UK",
    additional: "Postdoc researcher.",
    date: "05/15/2025, 4:05 PM",
  },
  {
    id: 17,
    name: "Oscar King",
    email: "oscar.king@test.com",
    linkedin: "https://www.linkedin.com/in/oscarking",
    resume: "oscarking.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Australia",
    additional: "Film director.",
    date: "05/15/2025, 4:10 PM",
  },
  {
    id: 18,
    name: "Paula Rivera",
    email: "paula.rivera@test.com",
    linkedin: "https://www.linkedin.com/in/paularivera",
    resume: "paularivera.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "Spain",
    additional: "Scientist.",
    date: "05/15/2025, 4:15 PM",
  },
  {
    id: 19,
    name: "Quinn Hong",
    email: "quinn.lee@test.com",
    linkedin: "https://www.linkedin.com/in/quinnlee",
    resume: "quinnlee.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "China",
    additional: "Engineer.",
    date: "05/15/2025, 4:20 PM",
  },
  {
    id: 20,
    name: "Rita Zhang",
    email: "rita.zhang@test.com",
    linkedin: "https://www.linkedin.com/in/ritazhang",
    resume: "ritazhang.pdf",
    visa: "E-2",
    status: "Pending",
    country: "China",
    additional: "Startup founder.",
    date: "05/15/2025, 4:25 PM",
  },
  {
    id: 21,
    name: "Sam Wilson",
    email: "sam.wilson@test.com",
    linkedin: "https://www.linkedin.com/in/samwilson",
    resume: "samwilson.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "USA",
    additional: "Medical doctor.",
    date: "05/15/2025, 4:30 PM",
  },
  {
    id: 22,
    name: "Tina Brooks",
    email: "tina.brooks@test.com",
    linkedin: "https://www.linkedin.com/in/tinabrooks",
    resume: "tinabrooks.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Canada",
    additional: "Professional athlete.",
    date: "05/15/2025, 4:35 PM",
  },
  {
    id: 23,
    name: "Uma Singh",
    email: "uma.singh@test.com",
    linkedin: "https://www.linkedin.com/in/umasingh",
    resume: "umasingh.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "India",
    additional: "Researcher.",
    date: "05/15/2025, 4:40 PM",
  },
  {
    id: 24,
    name: "Victor Hugo",
    email: "victor.hugo@test.com",
    linkedin: "https://www.linkedin.com/in/victorhugo",
    resume: "victorhugo.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "France",
    additional: "Software developer.",
    date: "05/15/2025, 4:45 PM",
  },
  {
    id: 25,
    name: "Wendy Bond",
    email: "wendy.park@test.com",
    linkedin: "https://www.linkedin.com/in/wendypark",
    resume: "wendypark.pdf",
    visa: "E-2",
    status: "Pending",
    country: "France",
    additional: "Business owner.",
    date: "05/15/2025, 4:50 PM",
  },
  {
    id: 26,
    name: "Xander Fox",
    email: "xander.fox@test.com",
    linkedin: "https://www.linkedin.com/in/xanderfox",
    resume: "xanderfox.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "UK",
    additional: "Environmental scientist.",
    date: "05/15/2025, 4:55 PM",
  },
  {
    id: 27,
    name: "Yara Costa",
    email: "yara.costa@test.com",
    linkedin: "https://www.linkedin.com/in/yaracosta",
    resume: "yaracosta.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Brazil",
    additional: "Dancer.",
    date: "05/15/2025, 5:00 PM",
  },
  {
    id: 28,
    name: "Zane Bell",
    email: "zane.bell@test.com",
    linkedin: "https://www.linkedin.com/in/zanebell",
    resume: "zanebell.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "USA",
    additional: "Inventor.",
    date: "05/15/2025, 5:05 PM",
  },
  {
    id: 29,
    name: "Amy Lin",
    email: "amy.lin@test.com",
    linkedin: "https://www.linkedin.com/in/amylin",
    resume: "amylin.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "Taiwan",
    additional: "Engineer.",
    date: "05/15/2025, 5:10 PM",
  },
  {
    id: 30,
    name: "Brian Young",
    email: "brian.young@test.com",
    linkedin: "https://www.linkedin.com/in/brianyoung",
    resume: "brianyoung.pdf",
    visa: "E-2",
    status: "Pending",
    country: "Canada",
    additional: "Startup founder.",
    date: "05/15/2025, 5:15 PM",
  },
  {
    id: 31,
    name: "Cathy Wu",
    email: "cathy.wu@test.com",
    linkedin: "https://www.linkedin.com/in/cathywu",
    resume: "cathywu.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "China",
    additional: "Scientist.",
    date: "05/15/2025, 5:20 PM",
  },
  {
    id: 32,
    name: "Daniel Evans",
    email: "daniel.evans@test.com",
    linkedin: "https://www.linkedin.com/in/daniellevans",
    resume: "daniellevans.pdf",
    visa: "O-1",
    status: "Pending",
    country: "UK",
    additional: "Actor.",
    date: "05/15/2025, 5:25 PM",
  },
  {
    id: 33,
    name: "Ella Torres",
    email: "ella.torres@test.com",
    linkedin: "https://www.linkedin.com/in/ellatorres",
    resume: "ellatorres.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "Spain",
    additional: "Researcher.",
    date: "05/15/2025, 5:30 PM",
  },
  {
    id: 34,
    name: "Felix Schmidt",
    email: "felix.schmidt@test.com",
    linkedin: "https://www.linkedin.com/in/felixschmidt",
    resume: "felixschmidt.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "Germany",
    additional: "Software engineer.",
    date: "05/15/2025, 5:35 PM",
  },
  {
    id: 35,
    name: "Gina Rossi",
    email: "gina.rossi@test.com",
    linkedin: "https://www.linkedin.com/in/ginarossi",
    resume: "ginarossi.pdf",
    visa: "E-2",
    status: "Pending",
    country: "Italy",
    additional: "Entrepreneur.",
    date: "05/15/2025, 5:40 PM",
  },
  {
    id: 36,
    name: "Hugo Silva",
    email: "hugo.silva@test.com",
    linkedin: "https://www.linkedin.com/in/hugosilva",
    resume: "hugosilva.pdf",
    visa: "EB-2 NIW",
    status: "Pending",
    country: "Portugal",
    additional: "Professor.",
    date: "05/15/2025, 5:45 PM",
  },
  {
    id: 37,
    name: "Isabel Gomez",
    email: "isabel.gomez@test.com",
    linkedin: "https://www.linkedin.com/in/isabelgomez",
    resume: "isabelgomez.pdf",
    visa: "O-1",
    status: "Pending",
    country: "Mexico",
    additional: "Artist.",
    date: "05/15/2025, 5:50 PM",
  },
  {
    id: 38,
    name: "James Carter",
    email: "james.carter@test.com",
    linkedin: "https://www.linkedin.com/in/jamescarter",
    resume: "jamescarter.pdf",
    visa: "EB-1A",
    status: "Pending",
    country: "USA",
    additional: "Inventor.",
    date: "05/15/2025, 5:55 PM",
  },
  {
    id: 39,
    name: "Kathy Messe",
    email: "kathy.lee@test.com",
    linkedin: "https://www.linkedin.com/in/kathylee",
    resume: "kathylee.pdf",
    visa: "H-1B",
    status: "Pending",
    country: "Serbia",
    additional: "Engineer.",
    date: "05/15/2025, 6:00 PM",
  },
  {
    id: 40,
    name: "Liam Murphy",
    email: "liam.murphy@test.com",
    linkedin: "https://www.linkedin.com/in/liammurphy",
    resume: "liammurphy.pdf",
    visa: "E-2",
    status: "Pending",
    country: "Ireland",
    additional: "Business owner.",
    date: "05/15/2025, 6:05 PM",
  },
];

// GET /api/leads - Fetch all leads
export async function GET() {
  return NextResponse.json(leads);
}

// POST /api/leads - Create a new lead (supports JSON and FormData)
export async function POST(request: Request) {
  try {
    let newLead: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // Handle JSON body
      const body = await request.json();
      newLead = {
        ...body,
        id: leads.length ? leads[leads.length - 1].id + 1 : 1,
        status: body.status || "Pending",
        date: new Date().toLocaleString(),
      };
    } else if (contentType.includes("multipart/form-data")) {
      // Handle FormData (file upload)
      const form = await request.formData();
      newLead = {
        id: leads.length ? leads[leads.length - 1].id + 1 : 1,
        name:
          (form.get("firstName") || "") + " " + (form.get("lastName") || ""),
        email: form.get("email") || "",
        linkedin: form.get("linkedInProfile") || "",
        resume:
          form.get("resume") instanceof File
            ? (form.get("resume") as File).name
            : "",
        visa: Array.isArray(form.getAll("visasOfInterest"))
          ? form.getAll("visasOfInterest").join(", ")
          : form.get("visasOfInterest") || "",
        status: "Pending",
        country: form.get("countryOfInterest") || "",
        additional: form.get("additionalInfo") || "",
        date: new Date().toLocaleString(),
      };
    } else {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 400 }
      );
    }

    leads.unshift(newLead); // Add new lead to the top of the array
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead." },
      { status: 500 }
    );
  }
}

// PUT /api/leads/:id - Update lead status
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "", 10);
    const { status } = await request.json();

    leads = leads.map((lead) =>
      lead.id === id ? { ...lead, status: status || lead.status } : lead
    );

    return NextResponse.json({ message: "Lead updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lead." },
      { status: 500 }
    );
  }
}
