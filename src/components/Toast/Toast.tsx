export default function Toast({ message }: { message: string }) {
  return message === "" ? null : <div className="toast">{message}</div>;
}
