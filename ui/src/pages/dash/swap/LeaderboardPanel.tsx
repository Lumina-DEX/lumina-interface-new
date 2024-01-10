import { Database } from "@/lib/database.types";
import useSupabaseFunctions from "@/services/supabase";
import { useEffect, useState } from "react";
import { Table } from "react-daisyui";

function LeaderboardPanel() {
  const { getLeaderboard } = useSupabaseFunctions();
  const [members, setMembers] = useState<
    Database["public"]["Tables"]["leaderboard"]["Row"][]
  >([]);

  useEffect(() => {
    getLeaderboard().then((response) => {
      if (
        response.status === 200 &&
        Array.isArray(response.data) &&
        response.data
      ) {
        setMembers(response.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full p-4 bg-light-100 overflow-y-auto">
      <Table className="rounded-box" zebra>
        <Table.Head className="text-base text-default">
          <div className="flex justify-start">
            <span>Name</span>
          </div>
          <div className="flex justify-center">
            <span>Points</span>
          </div>
        </Table.Head>
        <Table.Body>
          {members.map((member, index) => (
            <Table.Row key={index}>
              <div className="flex justify-start">
                <span>{member.name}</span>
              </div>
              <div className="flex justify-center">
                <span>{member.points}</span>
              </div>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
export default LeaderboardPanel;
