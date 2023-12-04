import { TriangleDownIcon } from "@radix-ui/react-icons";

export default function BookmarksButton() {
  return (
    <section>
      <button className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
    </section>
  );
}
