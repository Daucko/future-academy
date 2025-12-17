import { getSchoolNews } from "@/app/actions/news";
import NewsClient from "./client";

export default async function NewsPage() {
    const { data: news } = await getSchoolNews();
    return <NewsClient initialNews={news || []} />;
}
