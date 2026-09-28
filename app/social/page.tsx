import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addCommentAction, createPostAction, toggleFollowAction, toggleReactionAction } from "./actions";
import { SharePostButton } from "./share-post-button";
import { getSocialFeed } from "@/lib/social/server";
import "./social.css";

type SearchParams = Promise<{ mode?: string }>;

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default async function SocialPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const params = await searchParams;
  const mode = params.mode === "following" ? "following" : "world";
  const posts = await getSocialFeed(mode, user.id);

  return (
    <main className="social-main">
      <section className="social-shell" aria-labelledby="social-title">
        <header className="social-header">
          <Link href="/home" className="social-brand">MORISE</Link>
          <nav aria-label="Social navigation">
            <Link href="/home">WORLD</Link>
            <Link href="/system">SYSTEM</Link>
          </nav>
        </header>

        <section className="social-heading">
          <div>
            <p className="social-kicker">SOCIAL / WORLD SIGNAL</p>
            <h1 id="social-title">People are part of the world.</h1>
            <p>Share what you are doing, discover what others are building, and let meaningful activity lead you into the wider MORISE world.</p>
          </div>
          <div className="social-tabs" aria-label="Feed mode">
            <Link className={mode === "world" ? "is-active" : ""} href="/social">World</Link>
            <Link className={mode === "following" ? "is-active" : ""} href="/social?mode=following">Following</Link>
          </div>
        </section>

        <form className="social-composer" action={createPostAction}>
          <div>
            <p className="social-index">01 / SHARE</p>
            <h2>What are you thinking?</h2>
          </div>
          <textarea name="body" required maxLength={5000} placeholder="Share a thought, discovery, creation or moment from your MORISE world." aria-label="Post text" />
          <div className="social-composer-footer">
            <input name="media_url" type="url" inputMode="url" placeholder="Optional media URL" aria-label="Optional media URL" />
            <button className="social-primary-button" type="submit">Publish</button>
          </div>
        </form>

        <section className="social-feed" aria-labelledby="feed-title">
          <div className="social-section-heading">
            <div>
              <p className="social-index">02 / FEED</p>
              <h2 id="feed-title">{mode === "following" ? "Your circle" : "World stream"}</h2>
            </div>
            <span>{posts.length} visible</span>
          </div>

          {posts.length === 0 ? (
            <div className="social-empty">
              <strong>{mode === "following" ? "Your circle is still quiet." : "The World is waiting for its first signals."}</strong>
              <p>Create the first post, then follow people as you discover them.</p>
            </div>
          ) : (
            <div className="social-post-list">
              {posts.map((post) => (
                <article className="social-post" id={post.id} key={post.id}>
                  <header className="social-post-header">
                    <div className="social-avatar">{post.author.avatar_url ? <img alt="" src={post.author.avatar_url} /> : <span>{post.author.display_name.slice(0, 1).toUpperCase()}</span>}</div>
                    <div className="social-author">
                      <strong>{post.author.display_name}</strong>
                      {post.author.handle ? <span>@{post.author.handle}</span> : null}
                      <time dateTime={post.created_at}>{formatTime(post.created_at)}</time>
                    </div>
                    {post.author.id !== user.id ? (
                      <form action={toggleFollowAction}>
                        <input type="hidden" name="following_id" value={post.author.id} />
                        <button className="social-follow-button" type="submit">{post.followingAuthor ? "Following" : "Follow"}</button>
                      </form>
                    ) : null}
                  </header>

                  <p className="social-post-body">{post.body}</p>
                  {post.media_url ? <a className="social-media-link" href={post.media_url} target="_blank" rel="noreferrer">Open shared media ↗</a> : null}

                  <div className="social-post-meta">
                    <span>{post.reactionCount} reactions</span>
                    <span>{post.commentCount} comments</span>
                  </div>

                  <div className="social-post-actions">
                    <form action={toggleReactionAction}>
                      <input type="hidden" name="post_id" value={post.id} />
                      <button className={post.reactedByViewer ? "social-inline-button is-active" : "social-inline-button"} type="submit">
                        {post.reactedByViewer ? "Liked" : "Like"}
                      </button>
                    </form>
                    <SharePostButton postId={post.id} />
                  </div>

                  <form className="social-comment-form" action={addCommentAction}>
                    <input type="hidden" name="post_id" value={post.id} />
                    <input name="body" required maxLength={2000} placeholder="Add a comment…" aria-label="Comment on this post" />
                    <button className="social-inline-button" type="submit">Comment</button>
                  </form>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="social-footer">
          <span>Social is one layer of the MORISE world.</span>
          <Link href="/discover">Go discover something →</Link>
        </footer>
      </section>
    </main>
  );
}