import React from "react";
import { Section } from "@/components/layout/Section";
import { EmployeeCard } from "@/components/cards/EmployeeCard";
import { employeesData } from "@/data/employees";
import { Reveal } from "@/components/ui/Reveal";

export function Minions() {
  return (
    <Section
      id="minions"
      badge="SECTION 06 // TEAM TRIBUTES"
      title="THE MINIONS HAVE ENTERED THE CHAT"
      subtitle={`${employeesData.length} employees. One legendary boss. Countless tracker updates. And a whole lot of appreciation.`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employeesData.map((employee, idx) => (
          <Reveal
            key={employee.id}
            direction="up"
            delay={0.05 * ((idx % 4) + 1)}
          >
            <EmployeeCard employee={employee} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
