import { errorNotify, infoNotify } from "../../utils/getNotify";

const SharePostButton = ({ postSlug, postId, className = "btn btn-outline" }) => {
  const copyShareLink = async () => {
    const postKey = postSlug || postId;
    if (!postKey) {
      errorNotify("This post does not have a share link yet.");
      return;
    }

    const shareUrl = new URL(
      `/details/${encodeURIComponent(postKey)}`,
      window.location.origin
    ).href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      infoNotify("Share link copied to clipboard.");
    } catch {
      errorNotify("Could not copy the share link. Check clipboard permissions and try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={copyShareLink}
      className={className}
      aria-label="Copy share link"
    >
      Share
    </button>
  );
};

export default SharePostButton;
