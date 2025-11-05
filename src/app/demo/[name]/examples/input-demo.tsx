import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 p-6">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input placeholder="Disabled" disabled />
    </div>
  );
}
