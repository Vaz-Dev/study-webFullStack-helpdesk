import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../pages";

export function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/painel", { replace: true });
  }, [navigate]);
  return <Loading />;
}
