export interface Lesson {
    title: string;
    slug: string;
    number: number;
    downloadUrl: string;
    videoId: number;
    text: string;
    sourceUrl?: string;
}

export interface LessonWithPath extends Lesson {
    path: string;
}

export type Chapter = {
    title: string;
    slug: string;
    number: number;
    lessons: Lesson[] | LessonWithPath[];
}

export type Course = {
    title: string;
    chapters: Chapter[];
}

export interface OutlineBase {
    title: string;
    slug: string;
    number: number;
}

export interface OutlineChapter extends OutlineBase {
    lessons: OutlineLesson[];
}

export interface OutlineLesson extends OutlineBase {
    path: string;
}

export type CourseMeta = {
    title: string;
    chapters: OutlineChapter[];
}
