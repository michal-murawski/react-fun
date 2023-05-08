import path from 'path';
import fs from 'fs';
import * as matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getQuestions(): Promise<{ contentHtml: string }> {
    const questionsPath = path.join(process.cwd(), 'questions.md');
    const fileContents = fs.readFileSync(questionsPath, 'utf8');

    // Library has wrong types
    // @ts-ignore
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        contentHtml,
    };
}
