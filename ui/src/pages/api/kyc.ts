// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    console.log("/api/kyc", req.body);
    // {
    //   data: {
    //     address: 'B62qoEM26H9XzUhWQxjzpNN4B5ysMdAW7YnbRRbj3M3sStdyn3e8Npc',
    //     customerId: '4e9eeacc-5dba-421b-8e0c-9c430cad46cb',
    //     uid: 'unique session',
    //     type: 'kyc-zkpid',
    //     test: 'APPROVED'
    //   },
    //   payload: {
    //     data: {
    //       error: 0,
    //       jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL2V4YW1wbGVzL3YxIl0sImlkIjoiMmIzOWM1NDYtMWEzNC00MTg4LTkzNzgtZDY4ODFhMDE5NDVlIiwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkt5YyBBdHRlc3RhdGlvbiJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ6a3AiOiI3bVhKVUhCck1Cbm55azZyb2N1OUJ1Mm9zV0MzdlRGb3JidUhkR3BXWGhEOVRxNlhYQkE0OWRrb2M2a29idWlyOUZLRGhtVkVNQTZUN2kzTHFLclJrV2lUZWJVVUt2WXgiLCJ3YWxsZXQtYWRkcmVzcyI6IkI2MnFvRU0yNkg5WHpVaFdReGp6cE5ONEI1eXNNZEFXN1luYlJSYmozTTNzU3RkeW4zZThOcGMiLCJuYXRpb25hbGl0eSI6IkxUIiwiaWQiOiJCNjJxb0VNMjZIOVh6VWhXUXhqenBOTjRCNXlzTWRBVzdZbmJSUmJqM00zc1N0ZHluM2U4TnBjIn0sImlzc3VlciI6eyJpZCI6ImRpZDprZXk6VjAwMTp6Nk1rZ3pheWlOZzJOUkJOR0NBRGZZbmFoY1R1YjdBOXVva1VDajFrdlFqeUZKV2siLCJuYW1lIjoiemtwLUlEIn0sImlzc3VhbmNlRGF0ZSI6IjIwMjMtMDktMTFUMTI6MTI6MjQrMDA6MDAiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDktMTBUMTI6MTI6MjQrMDA6MDAiLCJwcm9vZiI6eyJ0eXBlIjoiRWQyNTUxOVNpZ25hdHVyZTIwMjAiLCJjcmVhdGVkIjoiMjAyMy0wOS0xMVQxMjoxMjoyNC41NzVaIiwiandzIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlpFUlRRU0o5Li5TcVZJOU11S2hZX0ZLc0xGQ0tFZ0JUa09qQW1GNGtMOTlGcWJudE9neFNVXzNadUdpckRRSjdLVU9rNUtlRXNCQ1cwV05kZGNLa2dfdy02YmxuTWpCQSIsInByb29mUHVycG9zZSI6ImFzc2VydGlvbk1ldGhvZCIsInZlcmlmaWNhdGlvbk1ldGhvZCI6ImRpZDprZXk6VjAwMTp6Nk1rZ3pheWlOZzJOUkJOR0NBRGZZbmFoY1R1YjdBOXVva1VDajFrdlFqeUZKV2sifX0.ZTISeVAIsgUjLgtwyajXPqy--KLzLDsfZMimsX5_q_sGAxeE42b5K3maSNpwgIsa8HqGLDDv7gLnXUJNL-bfAw',
    //       signid: [Array]
    //     }
    //   }
    // }
    const { payload } = req.body;

    if (payload.data.error) {
      throw "payload.data.error";
    }

    const { jwt } = payload.data;
    const decodedJwt: any = jwt_decode(jwt);
    const walletAddress = decodedJwt.credentialSubject["wallet-address"];
    const zkp = decodedJwt.credentialSubject.zkp;

    const result = await supabase.from("permissions").insert({
      wallet_address: walletAddress,
      zkp,
      mode: process.env.NODE_ENV,
    });

    console.log({ result });

    res.status(200);
  } catch (e) {
    console.error("/api/kyc", e);
    res.status(500);
  }
}
