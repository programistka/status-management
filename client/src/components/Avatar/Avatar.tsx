import { useState } from "react";

interface AvatarProps {
  src: string;
  name: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const Avatar = ({ src, name }: AvatarProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-24 h-24 rounded-full shrink-0 bg-blue-100 flex items-center justify-center">
        <span className="text-blue-500 text-xl font-semibold">{getInitials(name)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-24 h-24 rounded-full object-cover shrink-0"
      onError={() => setFailed(true)}
    />
  );
};

export default Avatar;
