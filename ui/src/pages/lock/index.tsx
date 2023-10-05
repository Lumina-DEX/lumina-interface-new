import React, { useState } from "react";
import { Form, Input } from "react-daisyui";

const LOCK_PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;

function LockPage() {
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    if (!!LOCK_PASSWORD && LOCK_PASSWORD === password) {
      const expired_at = new Date().getTime() + 1000 * 60 * 60 * 2; // 2 hours
      localStorage.setItem("token", expired_at.toString());
    }
  };

  return (
    <Form
      className="flex flex-col items-center justify-center gap-10 bg-white w-screen h-screen fixed"
      onSubmit={onSubmit}
    >
      <Input
        type="password"
        size="lg"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form>
  );
}

export default LockPage;
