import React from "react";
import List, { ListItem } from "./List";
import SectionHeadline from "./SectionHeadline";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-4 sm:py-20 ">
      <SectionHeadline title={"How This Platform Works"} styles={"py-6"} />

      <List>
        <ListItem
          count={1}
          primary="List your items for free"
          secondary="Yes, that' right! There is no fee to list your item."
        />
        <ListItem
          count={2}
          primary="Set your price"
          secondary="You are in complete control of the pricing."
        />
        <ListItem
          count={3}
          primary="Sit back and start earning"
          secondary="Earn while you sit on a beach or go on a vacation."
        />
      </List>
    </section>
  );
}

export default HowItWorks;
