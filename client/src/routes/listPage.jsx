import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/map/Map";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="flex h-full">
      <div className="flex-[3] h-full">
        <div className="h-full pr-[50px] flex flex-col gap-[50px] overflow-y-scroll pb-[50px]">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="flex-[2] h-full bg-[#fcf5f3] max-md:hidden pb-5">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
