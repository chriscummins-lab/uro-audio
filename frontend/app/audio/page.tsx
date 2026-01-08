import React from "react";
import { client } from "../../sanity/lib/client"; 

type Track = {
  _id: string;
  title: string;
  order?: number;
  audioUrl?: string;
};

type Chapter = {
  _id: string;
  title: string;
  order?: number;
  tracks: Track[];
};

type Guideline = {
  _id: string;
  title: string;
  level?: string;
  order?: number;
  chapters: Chapter[];
};

type Topic = {
  _id: string;
  title: string;
  order?: number;
  guidelines: Guideline[];
};

const query = /* groq */ `
*[_type=="topic"] | order(order asc) {
  _id,
  title,
  order,
  "guidelines": *[_type=="guideline" && references(^._id)] | order(order asc) {
    _id,
    title,
    level,
    order,
    "chapters": *[_type=="chapter" && references(^._id)] | order(order asc) {
      _id,
      title,
      order,
      "tracks": *[_type=="track" && references(^._id)] | order(order asc) {
        _id,
        title,
        order,
        audioUrl
      }
    }
  }
}
`;

export default async function AudioPage() {
  const topics: Topic[] = await client.fetch(query);

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Audio / Leitlinien
      </h1>

      {topics.length === 0 ? (
        <p>Noch keine Topics gefunden. Lege zuerst Themen/Leitlinien/Kapitel/Tracks in Sanity an.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {topics.map((topic: Topic) => (
            <details key={topic._id} open>
              <summary style={{ fontSize: 18, fontWeight: 600, cursor: "pointer" }}>
                {topic.title}
              </summary>

              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                {(topic.guidelines ?? []).map((g: Guideline) => (
                  <details key={g._id}>
                    <summary style={{ fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                      {g.title}{" "}
                      {g.level ? <span style={{ fontWeight: 400 }}>({g.level})</span> : null}
                    </summary>

                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      {(g.chapters ?? []).map((c: Chapter) => (
                        <div key={c._id} style={{ paddingLeft: 8 }}>
                          <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>

                          {(c.tracks ?? []).length ? (
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                              {(c.tracks ?? []).map((t: Track) => (
                                <li key={t._id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                                  <div style={{ fontWeight: 600, marginBottom: 8 }}>{t.title}</div>

                                  {t.audioUrl ? (
                                    <audio controls preload="none" style={{ width: "100%" }}>
                                      <source src={t.audioUrl} />
                                    </audio>
                                  ) : (
                                    <div style={{ color: "#666" }}>Keine audioUrl gesetzt.</div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div style={{ color: "#666" }}>Keine Tracks in diesem Kapitel.</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}
