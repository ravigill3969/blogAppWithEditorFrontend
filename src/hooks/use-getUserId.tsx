import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function useGetUserId() {
  const userId = useSelector((state: RootState) => state.userReducer.userId);
  return userId;
}

export default useGetUserId;
