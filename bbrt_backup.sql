--
-- PostgreSQL database dump
--

\restrict B1jVvOjjAANbACFENoaUNUAaMC6BknRoPw3cFUCEhluGZLcVNzq8MemC2k4qyKH

-- Dumped from database version 17.7 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: crew; Type: TABLE; Schema: public; Owner: richardwhittington
--

CREATE TABLE public.crew (
    id bigint NOT NULL,
    clerk_user_id character varying(255) NOT NULL,
    email character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.crew OWNER TO richardwhittington;

--
-- Name: crew_seq; Type: SEQUENCE; Schema: public; Owner: richardwhittington
--

CREATE SEQUENCE public.crew_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crew_seq OWNER TO richardwhittington;

--
-- Name: game_model; Type: TABLE; Schema: public; Owner: richardwhittington
--

CREATE TABLE public.game_model (
    id bigint NOT NULL,
    date_time character varying(255),
    home_team character varying(255),
    game_id bigint
);


ALTER TABLE public.game_model OWNER TO richardwhittington;

--
-- Name: game_model_seq; Type: SEQUENCE; Schema: public; Owner: richardwhittington
--

CREATE SEQUENCE public.game_model_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_model_seq OWNER TO richardwhittington;

--
-- Name: search; Type: TABLE; Schema: public; Owner: richardwhittington
--

CREATE TABLE public.search (
    id bigint NOT NULL,
    end_date date,
    saved_at timestamp(6) without time zone,
    start_date date,
    teams character varying(255),
    title character varying(255),
    crew_id bigint
);


ALTER TABLE public.search OWNER TO richardwhittington;

--
-- Name: search_seq; Type: SEQUENCE; Schema: public; Owner: richardwhittington
--

CREATE SEQUENCE public.search_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.search_seq OWNER TO richardwhittington;

--
-- Name: searches; Type: TABLE; Schema: public; Owner: richardwhittington
--

CREATE TABLE public.searches (
    search_id integer NOT NULL,
    user_id integer NOT NULL,
    search_results character varying(100),
    home_team character varying(50),
    dates character varying(50),
    crew_id bigint
);


ALTER TABLE public.searches OWNER TO richardwhittington;

--
-- Name: users; Type: TABLE; Schema: public; Owner: richardwhittington
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    fav_team character varying(50)
);


ALTER TABLE public.users OWNER TO richardwhittington;

--
-- Data for Name: crew; Type: TABLE DATA; Schema: public; Owner: richardwhittington
--

COPY public.crew (id, clerk_user_id, email, user_name) FROM stdin;
\.


--
-- Data for Name: game_model; Type: TABLE DATA; Schema: public; Owner: richardwhittington
--

COPY public.game_model (id, date_time, home_team, game_id) FROM stdin;
\.


--
-- Data for Name: search; Type: TABLE DATA; Schema: public; Owner: richardwhittington
--

COPY public.search (id, end_date, saved_at, start_date, teams, title, crew_id) FROM stdin;
\.


--
-- Data for Name: searches; Type: TABLE DATA; Schema: public; Owner: richardwhittington
--

COPY public.searches (search_id, user_id, search_results, home_team, dates, crew_id) FROM stdin;
400	200	STL	STL	8/23-9/03	\N
401	201	SEA	SEA	7/27-8/10	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: richardwhittington
--

COPY public.users (user_id, user_name, password, fav_team) FROM stdin;
200	Bob	jdjd82	STL, SEA
201	Rob	nad9a	SEA
\.


--
-- Name: crew_seq; Type: SEQUENCE SET; Schema: public; Owner: richardwhittington
--

SELECT pg_catalog.setval('public.crew_seq', 1, false);


--
-- Name: game_model_seq; Type: SEQUENCE SET; Schema: public; Owner: richardwhittington
--

SELECT pg_catalog.setval('public.game_model_seq', 1, false);


--
-- Name: search_seq; Type: SEQUENCE SET; Schema: public; Owner: richardwhittington
--

SELECT pg_catalog.setval('public.search_seq', 1, false);


--
-- Name: crew crew_pkey; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.crew
    ADD CONSTRAINT crew_pkey PRIMARY KEY (id);


--
-- Name: game_model game_model_pkey; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.game_model
    ADD CONSTRAINT game_model_pkey PRIMARY KEY (id);


--
-- Name: search search_pkey; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT search_pkey PRIMARY KEY (id);


--
-- Name: searches searches_pkey; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT searches_pkey PRIMARY KEY (search_id);


--
-- Name: crew uk95gc048nupg4xytr0hw6kih0; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.crew
    ADD CONSTRAINT uk95gc048nupg4xytr0hw6kih0 UNIQUE (clerk_user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_searches_user_id; Type: INDEX; Schema: public; Owner: richardwhittington
--

CREATE INDEX idx_searches_user_id ON public.searches USING btree (user_id);


--
-- Name: idx_users_user_name; Type: INDEX; Schema: public; Owner: richardwhittington
--

CREATE INDEX idx_users_user_name ON public.users USING btree (user_name);


--
-- Name: searches fk_searches_crew; Type: FK CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT fk_searches_crew FOREIGN KEY (crew_id) REFERENCES public.crew(id) ON DELETE CASCADE;


--
-- Name: search fkpdgv4c8oilpay4mdm36e0wkrb; Type: FK CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT fkpdgv4c8oilpay4mdm36e0wkrb FOREIGN KEY (crew_id) REFERENCES public.crew(id);


--
-- Name: searches searches_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: richardwhittington
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT searches_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict B1jVvOjjAANbACFENoaUNUAaMC6BknRoPw3cFUCEhluGZLcVNzq8MemC2k4qyKH

