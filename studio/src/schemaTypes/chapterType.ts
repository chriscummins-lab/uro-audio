import { defineField, defineType } from "sanity";

export const chapterType = defineType({
  name: "chapter",
  title: "Kapitel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      description: "Übersicht=0, Kapitel 1=10, Kapitel 2=20 …",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "guideline",
      title: "Leitlinie",
      type: "reference",
      to: [{ type: "guideline" }],
      validation: (r) => r.required(),
    }),
  ],
});
