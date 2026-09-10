import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { BrochureData } from "./types";

// Avoids a known resolution bug in @react-pdf/renderer's default hyphenation
// engine (@react-pdf/hyphenate) under some bundlers/runtimes — this simple
// callback (return the word unsplit) sidesteps it entirely and is fine for
// a brochure that doesn't need automatic word-hyphenation.
Font.registerHyphenationCallback((word) => [word]);

// TODO: replace with the real website and email once available.
const COMPANY = {
  name: "aPIONEER Business Solutions",
  addressLine1: "Nagarbhavi 2nd Stage, Bangalore",
  addressLine2: "Karnataka, India — 560091",
  phone: "+91 80 2955 8700",
  phoneHref: "tel:+918029558700",
  website: "www.apioneer.com", // TODO: replace with real domain
  email: "info@apioneer.com", // TODO: replace with real email
};

const COLORS = {
  navy: "#0b1f3a",
  navySoft: "#4b5a68",
  teal: "#188b73",
  gold: "#c39635",
  line: "#e4e7ec",
  paper: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 92,
    paddingBottom: 70,
    paddingHorizontal: 44,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: COLORS.navy,
  },

  // ---- Header (fixed) ----
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingHorizontal: 44,
    paddingTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.teal,
  },
  headerBrandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerLogo: { width: 30, height: 30 },
  headerWordmark: { fontSize: 12, fontFamily: "Helvetica-Bold", color: COLORS.navy },
  headerWordmarkAccent: { color: COLORS.gold },
  headerSub: { fontSize: 7, color: COLORS.navySoft, letterSpacing: 0.6, marginTop: 1 },

  // ---- Footer (fixed) ----
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 54,
    paddingHorizontal: 44,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  footerText: { fontSize: 7.5, color: COLORS.navySoft, lineHeight: 1.5 },
  footerBold: { fontFamily: "Helvetica-Bold", color: COLORS.navy },
  pageNumber: { fontSize: 7.5, color: COLORS.navySoft },

  // ---- Title block ----
  eyebrow: { fontSize: 8, fontFamily: "Helvetica-Bold", color: COLORS.teal, letterSpacing: 1.2, marginBottom: 6 },
  title: { fontSize: 20, fontFamily: "Helvetica-Bold", color: COLORS.navy, lineHeight: 1.25 },
  accentBar: { height: 3, width: 46, backgroundColor: COLORS.gold, marginTop: 10, marginBottom: 12 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginBottom: 16 },
  metaItem: { fontSize: 8.5, color: COLORS.navySoft },
  metaLabel: { fontFamily: "Helvetica-Bold", color: COLORS.navy },

  intro: { fontSize: 10, lineHeight: 1.6, color: "#334", marginBottom: 18 },

  // ---- Sections ----
  section: { marginBottom: 16 },
  sectionHeading: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.navy,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  bulletRow: { flexDirection: "row", marginBottom: 4, paddingRight: 8 },
  bulletDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.teal, marginTop: 3.5, marginRight: 7 },
  bulletText: { fontSize: 9.5, lineHeight: 1.5, color: "#2b3540", flex: 1 },

  outlineItem: { marginBottom: 10 },
  outlineHeadingRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  outlineNumber: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.navy,
    color: COLORS.paper,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    paddingTop: 3.5,
    marginRight: 8,
  },
  outlineHeading: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: COLORS.navy },
  outlineSubList: { marginLeft: 24 },
});

export function CourseBrochureDocument({ data, logoPath }: { data: BrochureData; logoPath?: string }) {
  return (
    <Document title={`${data.title} — Brochure`} author={COMPANY.name}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header — repeats on every page */}
        <View style={styles.header} fixed>
          <View style={styles.headerBrandRow}>
            {logoPath ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={logoPath} style={styles.headerLogo} />
            ) : null}
            <View>
              <Text style={styles.headerWordmark}>
                a<Text style={styles.headerWordmarkAccent}>PIONEER</Text>
              </Text>
              <Text style={styles.headerSub}>BUSINESS SOLUTIONS</Text>
            </View>
          </View>
          <Text style={{ fontSize: 8, color: COLORS.navySoft }}>Course Brochure</Text>
        </View>

        {/* Title block */}
        <Text style={styles.eyebrow}>{data.partner.toUpperCase()}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.accentBar} />

        <View style={styles.metaRow}>
          {data.category ? (
            <Text style={styles.metaItem}>
              <Text style={styles.metaLabel}>Category: </Text>
              {data.category}
            </Text>
          ) : null}
          {data.duration ? (
            <Text style={styles.metaItem}>
              <Text style={styles.metaLabel}>Duration: </Text>
              {data.duration}
            </Text>
          ) : null}
          {data.examDuration ? (
            <Text style={styles.metaItem}>
              <Text style={styles.metaLabel}>Exam: </Text>
              {data.examDuration}
            </Text>
          ) : null}
          {data.credential ? (
            <Text style={styles.metaItem}>
              <Text style={styles.metaLabel}>Credential: </Text>
              {data.credential}
            </Text>
          ) : null}
        </View>

        {data.intro ? <Text style={styles.intro}>{data.intro}</Text> : null}

        {data.objectives?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Objectives</Text>
            {data.objectives.map((o, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{o}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.audience?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Target Audience</Text>
            {data.audience.map((a, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{a}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.prerequisites?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Prerequisites</Text>
            {data.prerequisites.map((p, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{p}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.outline?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Course Outline</Text>
            {data.outline.map((section, i) => (
              <View key={i} style={styles.outlineItem} wrap={false}>
                <View style={styles.outlineHeadingRow}>
                  <Text style={styles.outlineNumber}>{i + 1}</Text>
                  <Text style={styles.outlineHeading}>{section.heading}</Text>
                </View>
                <View style={styles.outlineSubList}>
                  {section.points.map((pt, j) => (
                    <View key={j} style={styles.bulletRow}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.bulletText}>{pt}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Footer — repeats on every page */}
        <View style={styles.footer} fixed>
          <View>
            <Text style={[styles.footerText, styles.footerBold]}>{COMPANY.name}</Text>
            <Text style={styles.footerText}>{COMPANY.addressLine1}</Text>
            <Text style={styles.footerText}>{COMPANY.addressLine2}</Text>
            <Text style={styles.footerText}>
              {COMPANY.phone} · {COMPANY.website} · {COMPANY.email}
            </Text>
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}