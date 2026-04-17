import { defineField, defineType } from "sanity";
import { BADGE_OPTIONS, CATEGORY_OPTIONS } from "./shared";

export const articleType = defineType({
  name: "article",
  title: "مقال",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "العنوان",
      type: "string",
      validation: (rule) => rule.required().min(8),
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
      title: "ملخص قصير",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(220),
    }),
    defineField({
      name: "body",
      title: "المحتوى",
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
      title: "صورة الغلاف",
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
      title: "مدة القراءة (دقائق)",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(60),
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
