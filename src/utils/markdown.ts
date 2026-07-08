import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  content: string;
}

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

// Simple markdown frontmatter parser
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlLines = match[1].split("\n");
  const content = match[2];
  const data: Record<string, string | string[]> = {};

  yamlLines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value: string | string[] = line.slice(colonIndex + 1).trim();

      // Clean quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      // Handle tags array
      if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((v: string) => v.trim().replace(/['"]/g, ""));
      }

      data[key] = value;
    }
  });

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  // Ensure the directory exists
  if (!fs.existsSync(blogsDirectory)) {
    fs.mkdirSync(blogsDirectory, { recursive: true });
    // Write sample blogs if empty
    writeSampleBlogs();
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || "2026-07-08",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || "Sushma Sharma",
        readingTime: data.readingTime || "3 min read",
        content: content || "",
      } as BlogPost;
    });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      title: data.title || "Untitled Post",
      date: data.date || "2026-07-08",
      excerpt: data.excerpt || "",
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || "Sushma Sharma",
      readingTime: data.readingTime || "3 min read",
      content: content || "",
    } as BlogPost;
  } catch {
    return null;
  }
}

// Seed helper to populate sample MD blog posts
function writeSampleBlogs() {
  const samples = [
    {
      filename: "cloud-insider-detection.md",
      content: `---
title: "How We Built a Cloud Insider Attack Detection System using Python and ML"
date: "2026-07-05"
excerpt: "A technical deep dive into identifying anomalies in user behaviors using Django endpoints and Scikit-Learn classifiers."
category: "Artificial Intelligence"
tags: ["Python", "Machine Learning", "Security", "Django"]
author: "Sushma Sharma"
readingTime: "6 min read"
---

Cloud security has evolved beyond external firewall borders. Today, the most dangerous threat comes from within: **malicious insiders** who already possess credentialed access. In this article, I discuss the architecture of our cloud threat classification engine.

## The Threat Model
An insider threat involves employees or contractors performing actions they shouldn't:
1. Exfiltrating sensitive customer database archives.
2. Altering server security parameters.
3. Accessing sensitive systems during off-hours.

## Machine Learning Pipeline
To counter this, we designed a pipeline utilizing the **Isolation Forest** anomaly detection algorithm. 

\`\`\`python
from sklearn.ensemble import IsolationForest
import numpy as np

# Sample telemetry mapping: [login_hour, commands_frequency, file_access_count]
telemetry_data = np.array([
    [9, 15, 2],
    [10, 22, 5],
    [3, 140, 95] # suspicious off-hour peak exfiltration activity
])

model = IsolationForest(contamination=0.1, random_state=42)
model.fit(telemetry_data)
predictions = model.predict(telemetry_data) # -1 indicates anomaly
\`\`\`

## System Architecture
The backend is powered by **Django** which serves as the collector endpoint. Telemetry agents deployed on server clusters push user event logs via REST endpoints. The raw log data is processed and sent to the scikit-learn anomaly engine. When anomalies cross severity thresholds, a WebSocket event is fired, updating the Security Admin panel instantly.
`,
    },
    {
      filename: "yolo-object-detection.md",
      content: `---
title: "Deep Dive: Real-time Object Detection with YOLO and OpenCV"
date: "2026-07-01"
excerpt: "Optimizing YOLOv8 convolutional weights using frame interpolation for low-compute edge deployment."
category: "Python"
tags: ["Python", "YOLO", "OpenCV", "Computer Vision"]
author: "Sushma Sharma"
readingTime: "5 min read"
---

Deploying state-of-the-art computer vision models like **YOLO** (You Only Look Once) on edge hardware (e.g., Raspberry Pi, NVIDIA Jetson) presents a major challenge: latency vs. accuracy trade-offs.

## The Approach
We implemented YOLOv8 coupled with OpenCV frame processing. By mapping bounding coordinates and applying tracking routines, we avoided executing the heavy model weights on every single video frame.

\`\`\`python
import cv2
from ultralytics import YOLO

# Load model weights
model = YOLO('yolov8n.pt') 

# Open video stream
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Run YOLO detection
    results = model(frame)
    annotated_frame = results[0].plot()
    
    cv2.imshow("Real-time Tracking", annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
\`\`\`

## Latency Optimizations
1. **Model Quantization:** Converted PyTorch weights to ONNX FP16 format.
2. **Dynamic Resize:** Scaled high-resolution feeds down before parsing, mapping coordinates back to scale when rendering.
3. **Multi-Threading:** Decoupled frame-grabbing from inference processing.
`,
    },
    {
      filename: "ui-ux-design-principles.md",
      content: `---
title: "Modern UI/UX Design Principles: Glassmorphism and Micro-interactions"
date: "2026-06-25"
excerpt: "How to craft stunning developer portfolio cards and digital interfaces with HSL coloring and blur layers."
category: "UI UX"
tags: ["UI UX", "Figma", "Web Design", "Aesthetics"]
author: "Sushma Sharma"
readingTime: "4 min read"
---

Modern web design has moved beyond flat layouts. Today, users expect depth, physical lighting properties, and responsive micro-animations that make interfaces feel tactile.

## What is Glassmorphism?
Glassmorphism centers around a translucent look using:
- **Semi-transparent background** (using \`rgba\` or HSL alphas).
- **Backdrop-filter blur** for depth layers.
- **Subtle borders** mimicking light refraction.
- **Vibrant background blobs** to accentuate the blur effect.

\`\`\`css
.glass-panel {
  background: rgba(11, 17, 32, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}
\`\`\`

## Interactive Micro-animations
To keep layouts engaging:
1. **Spring Dynamics:** Swap out linear slide transitions for spring movements (using Framer Motion spring parameters).
2. **Custom Cursors:** Connect the mouse pointer to interactive ring animations that expand when hovering click triggers.
3. **Magnetic Pull:** Apply slight vector offsets to buttons so they stick dynamically to cursor vectors.
`,
    },
  ];

  samples.forEach((sample) => {
    const fullPath = path.join(blogsDirectory, sample.filename);
    fs.writeFileSync(fullPath, sample.content.trim(), "utf8");
  });
}
