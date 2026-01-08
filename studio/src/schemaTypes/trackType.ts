import { defineField, defineType } from "sanity";

export const trackType = defineType({
  name: "track",
  title: "Track (Audio)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", validation: (r) => r.min(0) }),
    defineField({
      name: "chapter",
      title: "Kapitel",
      type: "reference",
      to: [{ type: "chapter" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL (mp3/m4a)",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
});
