import { GetStaticPropsResult } from 'next';
import { getQuestions } from '@/modules/questions/services';

type QuestionsProps = {
    questions: {
        contentHtml: string;
    };
};

function QuestionsPage({ questions }: QuestionsProps) {
    return (
        <div>
            <h1 className="text-center text-4xl font-bold">Questions</h1>
            <div className="prose questions-page max-w-none p-3">
                <div
                    dangerouslySetInnerHTML={{ __html: questions.contentHtml }}
                />
            </div>
        </div>
    );
}

export const getStaticProps = async (): Promise<
    GetStaticPropsResult<QuestionsProps>
> => {
    const questions = await getQuestions();

    return {
        props: {
            questions,
        },
    };
};

export default QuestionsPage;
