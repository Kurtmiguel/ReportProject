import { z } from "zod";


export const SignUp = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
        message: "Email must set properly."
    }),
    password: z.string().min(2, {
        message: "Password  must be at least 2 characters."
    }) ,
    college: z.string().min(1, {
        message: "Please select College.",
    }),
    department: z.string().min(1, {
        message: "Please select Depatment.",
    })
  })

export type RegisterForm = z.infer<typeof SignUp>

export const LoginForm = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
});

export type LoginForm = z.infer<typeof LoginForm>;

const InhouseFieldSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  inhousetype: z.string().nonempty({ message: "Type is required" }),
});

const StudentFieldSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  course: z.string().nonempty({ message: "Course is required" }),
  organization: z.string().nonempty({ message: "Organization is required" }),
  studenttype: z.string().nonempty({ message: "Type is required" }),
});

const PartnerFieldSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
});

export const DashboardForm = z.object({
  month: z.string().nonempty({ message: "Month is required" }),
  projectName: z.string().nonempty({ message: "Project Name is required" }),
  coordinatorName: z.string().nonempty({ message: "Coordinator Name is required" }),
  event: z.string().nonempty({ message: "Event is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
  venue: z.string().nonempty({ message: "Venue is required" }),
  text: z.string().nonempty({ message: "Text is required" }),
  adult: z.string().nonempty({ message: "Adult is required" }),
  kids: z.string().nonempty({ message: "Kids is required" }),
  brgy: z.string().nonempty({ message: "Barangay is required" }),
  inhousefields: z.array(InhouseFieldSchema),
  studentfields: z.array(StudentFieldSchema),
  partnerfields: z.array(PartnerFieldSchema),
  narrative: z.string().nonempty({ message: "Narrative is required" }),
  monitoringUpload: z.any(),
  attendanceUpload: z.any(),
  attachmentsUpload: z.any(),
});

export type DashboardForm = z.infer<typeof DashboardForm>;