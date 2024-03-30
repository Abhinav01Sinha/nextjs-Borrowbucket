"use client";

import React from "react";
import SectionHeadline from "./SectionHeadline";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { itemCategories } from "@/data";

function BrowseItems() {
  return (
    <div className="py-20">
      <SectionHeadline styles="py-12" title="Looking to rent? Browse items" />
      <div className="flex flex-col sm:flex-row gap-4">
        {itemCategories.map((cat, ind) => (
          <div key={ind}>
            <Card className="flex flex-col items-center hover:shadow-md">
              <CardHeader>
                <CardTitle>{cat.display}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  alt={`${cat.name}`}
                  src={`/rent-${cat.name}.jpg`}
                  width={200}
                  height={100}
                />
              </CardContent>
              <CardFooter>
                <Link href={`/rent/${cat.name}`}>Browse &rarr;</Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseItems;
