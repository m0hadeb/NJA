import { defineArrayMember, defineField, defineType } from 'sanity';

const pageLocations = [
  { title: 'אודות — דרור אומר מוהדב', value: 'about-dror' },
  { title: 'אודות — Nan Jing Academy', value: 'about-academy' },
  { title: 'אודות — השיטה TCM 568', value: 'about-method' },
  { title: 'אודות — הקהילה', value: 'about-community' },
  { title: 'קורס — אבחנות מתקדמות א׳', value: 'course-advanced-a' },
  { title: 'קורס — אבחנות מתקדמות ב׳', value: 'course-advanced-b' },
  { title: 'קורס קצר — איזון הורמונלי', value: 'course-short-hormonal' },
  { title: 'קורס קצר — מערכת העיכול העליונה', value: 'course-short-upper-digestive' },
  { title: 'קורס קצר — דלקות מעיים', value: 'course-short-intestinal' },
  { title: 'קורס קצר — פסיכיאטריה ברפואה הסינית', value: 'course-short-psychiatry' },
];

export const contentPage = defineType({
  name: 'contentPage',
  title: 'דף תוכן',
  type: 'document',
  groups: [
    { name: 'content', title: 'תוכן', default: true },
    { name: 'media', title: 'תמונה / וידאו' },
    { name: 'advanced', title: 'מתקדם' },
  ],
  fields: [
    defineField({
      name: 'section',
      title: 'אזור באתר',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'אודות', value: 'about' },
          { title: 'קורסים', value: 'courses' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageKey',
      title: 'מיקום הדף באתר',
      description: 'בוחרים את הדף שבו התוכן הזה יוצג.',
      type: 'string',
      group: 'content',
      options: { list: pageLocations },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'כותרת ראשית',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'כותרת קטנה מעל הכותרת',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'פתיח מודגש',
      description: 'פסקת הפתיחה שמופיעה מתחת לכותרת.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'תוכן הכתבה',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'טקסט רגיל', value: 'normal' },
            { title: 'כותרת משנה', value: 'h2' },
            { title: 'כותרת קטנה', value: 'h3' },
            { title: 'ציטוט', value: 'blockquote' },
          ],
          lists: [
            { title: 'רשימת נקודות', value: 'bullet' },
            { title: 'רשימה ממוספרת', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'מודגש', value: 'strong' },
              { title: 'נטוי', value: 'em' },
              { title: 'קו תחתון', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'קישור',
                type: 'object',
                fields: [{ name: 'href', title: 'כתובת', type: 'url' }],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'תיאור התמונה', type: 'string' },
      ],
    }),
    defineField({
      name: 'videoFile',
      title: 'קובץ וידאו',
      description: 'אפשר להעלות MP4 או WebM. אם יש וידאו, הוא יוצג במקום התמונה.',
      type: 'file',
      group: 'media',
      options: { accept: 'video/mp4,video/webm' },
    }),
    defineField({
      name: 'videoUrl',
      title: 'קישור ישיר לווידאו',
      description: 'חלופה להעלאת קובץ — קישור ישיר לקובץ MP4 או WebM.',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'mediaCaption',
      title: 'כיתוב מתחת לתמונה או לווידאו',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'customHtml',
      title: 'HTML מותאם אישית',
      description: 'שדה מתקדם. ה־HTML יעבור סינון אבטחה לפני שיוצג באתר.',
      type: 'text',
      rows: 14,
      group: 'advanced',
    }),
    defineField({
      name: 'seoDescription',
      title: 'תיאור למנועי חיפוש',
      type: 'text',
      rows: 3,
      group: 'advanced',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageKey',
      media: 'mainImage',
    },
  },
});
