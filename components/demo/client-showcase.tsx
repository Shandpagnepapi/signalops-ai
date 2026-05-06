import { Building2, Clock3, Star, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoClient } from "@/lib/mock-data";

const icons = [Building2, UsersRound, Clock3, Star];

export function ClientShowcase() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <Card className="overflow-hidden bg-slate-950/75">
        <CardHeader>
          <Badge className="mb-2 w-fit bg-blue-500/14 text-blue-100">{demoClient.industry}</Badge>
          <CardTitle className="text-2xl">{demoClient.headline}</CardTitle>
          <CardDescription>{demoClient.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoClient.services.map((service, index) => {
              const Icon = icons[index] ?? Building2;
              return (
                <div key={service} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <Icon className="mb-3 size-5 text-cyan-200" aria-hidden="true" />
                  <p className="font-medium text-white">{service}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/10">
        <CardHeader>
          <CardTitle>Client goal</CardTitle>
          <CardDescription>{demoClient.goal}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoClient.painPoints.map((point) => (
              <div key={point} className="rounded-lg border border-blue-200/15 bg-slate-950/50 p-4 text-sm text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
