/* eslint-disable */
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "url";

let counter = 0;

export async function getServerSideProps() {
  counter++;

  return {
    props: {
      initialPropsCounter: counter,
    },
  };
}

export default function Index(props) {
  const { initialPropsCounter } = props;

  const router = useRouter();

  const { pathname, query } = router;

  const reload = () => {
    router.push(format({ pathname, query }));
  };

  const incrementCounter = () => {
    // eslint-disable-next-line radix
    const currentCounter = query.counter ? parseInt(query.counter) : 0;

    const href = `/shallow/?counter=${currentCounter + 1}`;

    router.push(href, href, { shallow: true });
  };

  useEffect(() => {
    // setList();
    console.log("««««« counter »»»»»", query.counter);
  }, [query.counter]);

  return (
    <div>
      <h2>This is the Shallow Page</h2>

      <Link href="/about">About</Link>

      <button onClick={reload}>Reload</button>

      <button onClick={incrementCounter}>Change State Counter</button>

      <p>"getServerSideProps" ran for "{initialPropsCounter}" times.</p>

      <p>Counter: "{query.counter || 0}".</p>
    </div>
  );
}
