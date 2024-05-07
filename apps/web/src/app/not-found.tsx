import ErrorCard from "@/components/ErrorCard";

export default function NotFound() {
  return (
    <ErrorCard
      heading="404 Not Found"
      message="お探しのページが見つかりませんでした"
      link="/"
      button="Go Home"
    />
  );
}
