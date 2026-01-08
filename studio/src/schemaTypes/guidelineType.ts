import { defineField, defineType } from "sanity";

export const guidelineType = defineType({
  name: "guideline",
  title: "Leitlinie",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: { list: ["S3", "S2k", "S2e", "S1"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      title: "Thema",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", validation: (r) => r.min(0) }),
    defineField({ name: "overview", title: "Übersicht (optional)", type: "text" }),
  ],
});
