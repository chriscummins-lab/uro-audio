import { defineField, defineType } from "sanity";

export const topicType = defineType({
  name: "topic",
  title: "Thema",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Reihenfolge", type: "number", validation: (r) => r.min(0) }),
  ],
});
