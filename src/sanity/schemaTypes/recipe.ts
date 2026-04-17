import { defineField, defineType } from "sanity";
import { BADGE_OPTIONS } from "./shared";

export const recipeType = defineType({
  name: "recipe",
  title: "وصفة",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "اسم الوصفة",
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
      rows: 3,
      validation: (rule) => rule.required().min(15).max(220),
    }),
    defineField({
      name: "body",
      title: "وصف تفصيلي",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "التصنيف الرئيسي",
      type: "string",
      initialValue: "recipes",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "subcategory",
      title: "نوع الوصفة",
      type: "string",
      options: {
        list: [
          { title: "فطور", value: "breakfast" },
          { title: "غداء", value: "lunch" },
          { title: "عشاء", value: "dinner" },
          { title: "حلويات", value: "desserts" },
          { title: "مشروبات", value: "drinks" },
          { title: "سريعة", value: "quick" },
          { title: "اقتصادية", value: "budget" },
          { title: "مناسبات", value: "events" },
        ],
      },
    }),
    defineField({
      name: "ingredients",
      title: "المكونات",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "steps",
      title: "الخطوات",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2),
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
      initialValue: 6,
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
      subtitle: "subcategory",
      media: "coverImage",
    },
  },
});
