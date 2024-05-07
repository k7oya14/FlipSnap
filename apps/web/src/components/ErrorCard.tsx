import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  heading: string;
  message: string;
  button: string;
  link: string;
};

const ErrorCard = (props: Props) => {
  const { heading, message, button, link } = props;
  return (
    <Card className="m-4 p-4 max-w-[90vw] w-fit mx-auto shadow-lg">
      <CardContent className="flex flex-col items-center justify-center mt-6">
        <TriangleAlert className="text-yellow-300 size-[70px] mb-4" />
        <h1 className="text-center text-2xl font-bold">{heading}</h1>
        <h1 className="text-center my-4">{message} </h1>
        <Link href={`${link}`}>
          <Button className="text-white rounded-lg">{button}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
