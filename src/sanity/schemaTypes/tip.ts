import { defineField, defineType } from "sanity";
import { BADGE_OPTIONS, CATEGORY_OPTIONS } from "./shared";

export const tipType = defineType({
  name: "tip",
  title: "نصيحة",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان النصيحة",
      type: "string",
      validation: (rule) => rule.required().min(6),
    }),
    defineField({
      name: "slug",
      title: "الرابط المختصر (Slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "وصف قصير",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().min(10).max(160),
    }),
    defineField({
      name: "body",
      title: "شرح أو تفاصيل",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "التصنيف الرئيسي",
      type: "string",
      options: { list: CATEGORY_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "تصنيف فرعي",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "صورة",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverAlt",
      title: "وصف الصورة (Alt)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readMinutes",
      title: "مدة القراءة",
      type: "number",
      initialValue: 2,
      validation: (rule) => rule.required().min(1).max(30),
    }),
    defineField({
      name: "badges",
      title: "شارات العرض",
      type: "array",
      of: [{ type: "string" }],
      options: { list: BADGE_OPTIONS, layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "تاريخ النشر",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "الكاتب",
      type: "string",
      initialValue: "فريق لهلوبة",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
