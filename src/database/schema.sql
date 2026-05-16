-- ============================================================
-- Schema SQL — Mind Group Blog
-- ============================================================

CREATE DATABASE IF NOT EXISTS mind_group_blog
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mind_group_blog;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR(36)  NOT NULL PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de artigos
CREATE TABLE IF NOT EXISTS articles (
  id            VARCHAR(36)   NOT NULL PRIMARY KEY,
  title         VARCHAR(255)  NOT NULL,
  summary       TEXT          NOT NULL,
  content       LONGTEXT      NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  tags          JSON          NOT NULL DEFAULT (JSON_ARRAY()),
  banner_image  VARCHAR(500)  NULL,
  author_id     VARCHAR(36)   NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_articles_author
    FOREIGN KEY (author_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_category  ON articles(category);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
