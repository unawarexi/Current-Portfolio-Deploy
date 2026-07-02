/**
 * ============================================================================
 * ADVANCED TEXT FORMATTER UTILITY
 * ============================================================================
 * Production-grade formatter for normalizing, parsing, and structuring
 * unstructured text data across the entire application.
 *
 * Reusable for: About, Experience, Projects, Education, Certifications, etc.
 *
 * Features:
 * - Markdown section parsing (headers, subheaders, bullet points)
 * - Array extraction from merged strings
 * - Text normalization and cleaning
 * - Structured section extraction
 * - Multi-format support (markdown, bullets, numbered lists)
 * ============================================================================
 */

class AdvancedFormatter {
  /**
   * Parse markdown sections into structured objects
   * Handles: # H1, ## H2, ### H3 headers with content
   *
   * @param {string} text - Raw markdown text
   * @returns {Array<Object>} Array of { title, level, content, type }
   *
   * @example
   * parseMarkdownSections("# Vision\nBuild amazing things\n## Subheader\nDo stuff")
   * Returns: [{ title: "Vision", level: 1, content: "Build amazing things", type: "section" }, ...]
   */
  static parseMarkdownSections(text) {
    if (!text || typeof text !== "string") return [];

    const sections = [];
    const lines = text.split("\n");
    let currentSection = null;
    let contentBuffer = [];

    for (const line of lines) {
      const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);

      if (headerMatch) {
        // Save previous section if exists
        if (currentSection) {
          currentSection.content = contentBuffer.join("\n").trim();
          sections.push(currentSection);
          contentBuffer = [];
        }

        // Create new section
        const level = headerMatch[1].length;
        const title = headerMatch[2].trim();
        currentSection = {
          title,
          level,
          content: "",
          type: "section",
        };
      } else if (currentSection && line.trim()) {
        contentBuffer.push(line);
      }
    }

    // Save last section
    if (currentSection) {
      currentSection.content = contentBuffer.join("\n").trim();
      sections.push(currentSection);
    }

    return sections;
  }

  /**
   * Extract bullet points from text
   * Handles: •, -, *, formats with optional numbering
   *
   * @param {string} text - Text containing bullet points
   * @returns {Array<string>} Cleaned bullet point items
   *
   * @example
   * extractBulletPoints("• Item 1\n• Item 2\n- Item 3")
   * Returns: ["Item 1", "Item 2", "Item 3"]
   */
  static extractBulletPoints(text) {
    if (!text || typeof text !== "string") return [];

    return text
      .split("\n")
      .map((line) => line.replace(/^[\s•\-*]+/, "").trim())
      .filter((line) => line.length > 0);
  }

  /**
   * Parse numbered or lettered lists
   * Handles: 1., 2., a), b), etc.
   *
   * @param {string} text - Text containing numbered items
   * @returns {Array<string>} List items without numbering
   *
   * @example
   * parseNumberedList("1. First\n2. Second\n3. Third")
   * Returns: ["First", "Second", "Third"]
   */
  static parseNumberedList(text) {
    if (!text || typeof text !== "string") return [];

    return text
      .split("\n")
      .map((line) => {
        // Remove: 1., 1), a., a), etc.
        return line.replace(/^\s*[\d\w]+[\.)]\s*/, "").trim();
      })
      .filter((line) => line.length > 0);
  }

  /**
   * Parse array-like merged strings into clean array items
   * Handles: comma-separated, newline-separated, semicolon-separated
   * Removes trailing punctuation and normalizes
   *
   * @param {string|Array} data - String or array to normalize
   * @param {string} separator - Delimiter (auto-detect if not provided)
   * @returns {Array<string>} Normalized array
   *
   * @example
   * parseArray("item1, item2, item3,")
   * Returns: ["item1", "item2", "item3"]
   */
  static parseArray(data, separator = null) {
    // If already an array, normalize each item
    if (Array.isArray(data)) {
      return data
        .map((item) => this.normalizeText(String(item)))
        .filter((item) => item.length > 0);
    }

    if (!data || typeof data !== "string") return [];

    let items = [];

    // Auto-detect separator if not provided
    if (!separator) {
      if (data.includes("\n\n")) separator = "\n\n";
      else if (data.includes("\n")) separator = "\n";
      else if (data.includes(";")) separator = ";";
      else if (data.includes(",")) separator = ",";
      else return [this.normalizeText(data)];
    }

    items = data.split(separator);

    return items
      .map((item) => this.normalizeText(item.trim()))
      .filter((item) => item.length > 0);
  }

  /**
   * Normalize text: trim, remove extra spaces, trailing punctuation
   *
   * @param {string} text - Raw text
   * @returns {string} Cleaned text
   */
  static normalizeText(text) {
    if (!text || typeof text !== "string") return "";

    return text
      .trim()
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .replace(/,\s*$/, "") // Remove trailing comma
      .replace(/;$/, "") // Remove trailing semicolon
      .replace(/:\s*$/, ""); // Remove trailing colon
  }

  /**
   * Parse certifications from merged text
   * Handles numbered format: "1. Name\nCredential ID: xxx\nURL: xxx\n2. Next..."
   *
   * @param {string|Array} data - Raw certification data
   * @returns {Array<Object>} Structured certifications
   *
   * @example
   * Returns: [{ name: "...", credentialId: "...", url: "..." }, ...]
   */
  static parseCertifications(data) {
    const items = this.parseArray(data, "\n");
    const certifications = [];
    let currentCert = null;

    for (const item of items) {
      // Check for numbered header: "1. Name"
      const numberMatch = item.match(/^\d+\.\s+(.+)$/);
      if (numberMatch) {
        if (currentCert && currentCert.name) {
          certifications.push(currentCert);
        }
        currentCert = {
          name: numberMatch[1].trim(),
          credentialId: "",
          issuer: "",
          url: "",
        };
      } else if (currentCert) {
        // Parse key-value pairs
        if (item.toLowerCase().includes("credential id")) {
          currentCert.credentialId = item.split(":").slice(1).join(":").trim();
        } else if (item.toLowerCase().includes("issuer")) {
          currentCert.issuer = item.split(":").slice(1).join(":").trim();
        } else if (item.toLowerCase().includes("http")) {
          currentCert.url = item.includes(":")
            ? item.split(":").slice(1).join(":").trim()
            : item.trim();
        }
      }
    }

    // Save last cert
    if (currentCert && currentCert.name) {
      certifications.push(currentCert);
    }

    return certifications;
  }

  /**
   * Parse education entries from merged text
   * Handles format: "Institution - Degree - Year"
   *
   * @param {string|Array} data - Raw education data
   * @returns {Array<Object>} Structured education entries
   *
   * @example
   * Returns: [{ institution: "...", degree: "...", year: "..." }, ...]
   */
  static parseEducation(data) {
    const items = this.parseArray(data);

    return items.map((item) => {
      const parts = item.split("-").map((p) => p.trim());

      return {
        institution: parts[0] || "",
        degree: parts[1] || "",
        year: parts[2] || "",
      };
    });
  }

  /**
   * Parse language entries
   * Handles format: "English - Native" or "English:Native"
   *
   * @param {string|Array} data - Raw language data
   * @returns {Array<Object>} Structured languages
   *
   * @example
   * Returns: [{ name: "...", level: "..." }, ...]
   */
  static parseLanguages(data) {
    const items = this.parseArray(data);

    return items.map((item) => {
      const parts = item.split(/[-:]/).map((p) => p.trim());

      return {
        name: parts[0] || "",
        level: parts[1] || "",
      };
    });
  }

  /**
   * Parse values with markdown formatting into structured array
   * Handles: "### 1. Value Name\nContent...\n---\n### 2. Next Value"
   *
   * @param {string|Array} data - Raw values data
   * @returns {Array<Object>} Structured values
   *
   * @example
   * Returns: [{ title: "Integrity", content: "I operate with...", order: 1 }, ...]
   */
  static parseValues(data) {
    const items = this.parseArray(data, "---");
    const values = [];

    for (const item of items) {
      const lines = item.trim().split("\n");
      let title = "";
      let content = "";

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Extract title from markdown: ### 1. Title or ### Title
        if (line.includes("###")) {
          const titleMatch = line.match(/###\s+(?:\d+\.\s+)?(.+)/);
          if (titleMatch) {
            title = titleMatch[1].trim();
          }
        } else if (line.trim()) {
          content = content ? `${content}\n${line}` : line;
        }
      }

      if (title) {
        values.push({
          title: title.trim(),
          content: content.trim(),
        });
      }
    }

    return values;
  }

  /**
   * Parse hobbies/interests - handle trailing commas and normalize
   *
   * @param {string|Array} data - Raw hobbies data
   * @returns {Array<string>} Cleaned hobbies array
   *
   * @example
   * parseHobbies("Photography, Coding, Travelling,")
   * Returns: ["Photography", "Coding", "Travelling"]
   */
  static parseHobbies(data) {
    const items = this.parseArray(data);
    return items.map((hobby) => hobby.replace(/,\s*$/, "").trim());
  }

  /**
   * Parse goals - handle arrays and merged strings
   *
   * @param {string|Array} data - Raw goals data
   * @returns {Array<string>} Cleaned goals array
   */
  static parseGoals(data) {
    const items = this.parseArray(data);
    return items.filter((goal) => goal.length > 5); // Filter out very short items
  }

  /**
   * Parse funFacts - special handling for interesting tidbits
   *
   * @param {string|Array} data - Raw facts data
   * @returns {Array<string>} Structured facts
   */
  static parseFunFacts(data) {
    const items = this.parseArray(data);
    return items.map((fact) => fact.charAt(0).toUpperCase() + fact.slice(1));
  }

  /**
   * Sanitize a stored Firestore profile before sending to the client.
   * Strips markdown headers, separators, and trailing punctuation from
   * fields that were saved with raw markdown formatting.
   *
   * Applied in GET /about to clean up data at read-time.
   *
   * @param {Object} raw - Raw profile document from Firestore
   * @returns {Object} Sanitized profile ready for the API response
   */
  static sanitizeProfileResponse(raw) {
    if (!raw || typeof raw !== "object") return raw ?? {};

    const isMarkdownHeader = (s) => /^#{1,6}\s/.test(s);
    const isSeparator = (s) => /^[-*_]{2,}\s*$/.test(s);

    // Filter markdown noise from a string[] field
    const cleanArray = (arr) => {
      if (!Array.isArray(arr)) return arr ?? [];
      return arr
        .map((item) => this.normalizeText(String(item ?? "").replace(/,\s*$/, "")))
        .filter((item) => item.length > 0 && !isMarkdownHeader(item) && !isSeparator(item));
    };

    // Remove leading markdown title line(s) from a prose field
    const stripLeadingTitle = (text) => {
      if (!text || typeof text !== "string") return text ?? "";
      return text.replace(/^(#{1,6}[^\n]*\n)+/, "").trim();
    };

    return {
      ...raw,
      goals:      cleanArray(raw.goals),
      values:     cleanArray(raw.values),
      funFacts:   cleanArray(raw.funFacts),
      hobbies:    cleanArray(raw.hobbies),
      mission:    stripLeadingTitle(raw.mission),
      philosophy: stripLeadingTitle(raw.philosophy),
    };
  }

  /**
   * ============================================================================
   * ORCHESTRATED FORMATTER FOR ABOUT SECTION
   * ============================================================================
   * Applies all formatting rules to the about profile data
   *
   * @param {Object} rawData - Raw input data from form/request
   * @returns {Object} Fully formatted and normalized data
   */
  static formatAboutProfile(rawData) {
    if (!rawData || typeof rawData !== "object") {
      throw new Error("Input must be a non-null object");
    }

    // Parse markdown sections (vision, mission, philosophy)
    const visionSections = rawData.vision
      ? this.parseMarkdownSections(rawData.vision)
      : [];
    const missionSections = rawData.mission
      ? this.parseMarkdownSections(rawData.mission)
      : [];
    const philosophySections = rawData.philosophy
      ? this.parseMarkdownSections(rawData.philosophy)
      : [];

    return {
      // Identity fields
      name: this.normalizeText(rawData.name || ""),
      headline: this.normalizeText(rawData.headline || ""),
      tagline: this.normalizeText(rawData.tagline || ""),
      bio: this.normalizeText(rawData.bio || ""),
      history: this.normalizeText(rawData.history || ""),

      // Philosophy & vision (structured)
      vision: this.preserveRichText(rawData.vision || ""),
      mission: this.preserveRichText(rawData.mission || ""),
      philosophy: this.preserveRichText(rawData.philosophy || ""),

      // Arrays (normalized)
      goals: this.parseGoals(rawData.goals),
      values: this.parseValues(rawData.values),
      funFacts: this.parseFunFacts(rawData.funFacts),
      hobbies: this.parseHobbies(rawData.hobbies),

      // Current focus
      currentFocus: this.normalizeText(rawData.currentFocus || ""),

      // Education & credentials (structured)
      education: this.parseEducation(rawData.education),
      certifications: this.parseCertifications(rawData.certifications),
      languages: this.parseLanguages(rawData.languages),

      // Availability
      openToWork: rawData.openToWork === "true" || rawData.openToWork === true,
      availabilityNote: this.normalizeText(rawData.availabilityNote || ""),

      // Media URLs
      avatar: (rawData.avatar || "").trim(),
      cvUrl: (rawData.cvUrl || "").trim(),

      // Stats
      yearsOfExperience: parseInt(rawData.yearsOfExperience || "0", 10),
      projectsCount: parseInt(rawData.projectsCount || "0", 10),
      clientsCount: parseInt(rawData.clientsCount || "0", 10),
      rating: parseFloat(rawData.rating || "5.0"),

      // Socials
      socials: {
        github: (rawData.socials?.github || "").trim(),
        linkedin: (rawData.socials?.linkedin || "").trim(),
        twitter: (rawData.socials?.twitter || "").trim(),
        instagram: (rawData.socials?.instagram || "").trim(),
        website: (rawData.socials?.website || "").trim(),
      },
    };
  }

  /**
   * ============================================================================
   * ORCHESTRATED FORMATTER FOR EXPERIENCE SECTION
   * ============================================================================
   * Reusable for parsing work experience entries
   *
   * @param {Object} rawData - Raw experience data
   * @returns {Object} Formatted experience object
   */
  static formatExperience(rawData) {
    return {
      id: rawData.id || "",
      title: this.normalizeText(rawData.title || ""),
      company: this.normalizeText(rawData.company || ""),
      location: this.normalizeText(rawData.location || ""),
      startDate: rawData.startDate || "",
      endDate: rawData.endDate || "",
      isCurrent: rawData.isCurrent === true || rawData.isCurrent === "true",
      description: this.normalizeText(rawData.description || ""),
      achievements: this.parseArray(rawData.achievements),
      technologies: this.parseArray(rawData.technologies),
      responsibilities: this.extractBulletPoints(
        rawData.responsibilities || "",
      ),
      type: rawData.type || "employment", // employment, freelance, volunteer
    };
  }



  /**
   * Preserve intentional rich-text structure for long-form fields
   * (description, features, challenges, solution, results).
   *
   * - Trims trailing whitespace per line (keeps leading indent/spaces)
   * - Collapses 3+ consecutive blank lines down to 2
   * - Does NOT collapse inline spaces — "1.  Item" stays intact
   * - Does NOT strip bullets, numbering, or markdown headers
   *
   * @param {string} val
   * @returns {string}
   */
  static preserveRichText(val) {
    if (!val || typeof val !== "string") return "";

    return val
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  /**
   * ============================================================================
   * ORCHESTRATED FORMATTER FOR PROJECT CREATE / UPDATE
   * ============================================================================
   * Applies field-appropriate formatting to a Zod-validated project payload.
   *
   * Field categories:
   *   SHORT TEXT  — single-line meta fields      → normalizeText
   *   RICH TEXT   — long-form structured blocks  → preserveRichText
   *   ARRAYS      — technologies, team           → parseArray
   *   URLS/IMAGES — already validated; pass through untouched
   *
   * For PATCH updates pass only the keys being updated; the rest default
   * to safe empty values so nothing is accidentally overwritten.
   *
   * @param {Object} data — Zod-validated project payload (full or partial)
   * @returns {Object}    — Formatted payload (same shape)
   */
  static formatProjectData(data = {}) {
    const d = data;

    return {
      // ── Required ────────────────────────────────────────────────────────
      title: this.normalizeText(d.title ?? ""),
      category: this.normalizeText(d.category ?? ""),

      // description can be multi-paragraph — preserve its structure
      description: this.preserveRichText(d.description ?? ""),

      // ── Short meta ──────────────────────────────────────────────────────
      type: this.normalizeText(d.type ?? ""),
      status: this.normalizeText(d.status ?? ""),
      year: this.normalizeText(d.year ?? ""),
      client: this.normalizeText(d.client ?? ""),
      role: this.normalizeText(d.role ?? ""),
      duration: this.normalizeText(d.duration ?? ""),

      // ── Array meta ───────────────────────────────────────────────────────
      team: this.parseArray(d.team),
      technologies: this.parseArray(d.technologies),

      // ── Long-form rich text ──────────────────────────────────────────────
      // Numbered lists, bullet points, multi-paragraph prose and intentional
      // blank-line separators are all preserved as-is.
      features: this.parseArray(d.features),
      challenges: this.preserveRichText(d.challenges ?? ""),
      solution: this.preserveRichText(d.solution ?? ""),
      results: this.preserveRichText(d.results ?? ""),

      // ── Links (URL arrays — Zod-validated; pass through) ────────────────
      githubLinks: d.githubLinks ?? [],
      googlePlayLinks: d.googlePlayLinks ?? [],
      appStoreLinks: d.appStoreLinks ?? [],
      webLiveLinks: d.webLiveLinks ?? [],
      videoUrls: d.videoUrls ?? [],

      // ── Images (Cloudinary URLs — split by extractLinks in service) ──────
      coverImages: d.coverImages ?? [],
      projectImages: d.projectImages ?? [],
    };
  }


}

export default AdvancedFormatter;
