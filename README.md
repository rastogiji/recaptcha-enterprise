# Integrating Recaptcha Enterprise with your website

reCAPTCHA Enterprise is the next generation of recaptcha by Google aimed at enterprises. It combines the score based approach of recaptcha v3 with support for mobile platform as well.

This repository is aimed at making it easy for developers to integrate recaptcha with your code and ensure a great user experience.

## Pre requisites

  1. A Google Cloud Project with Billing Enabled
  2. An FQDN (Fully Qualified Domain Name)
## Solution flow
Please find the solution flow used in this repo:

![Alt text](https://github.com/rastogiji/recaptcha-enterprise/blob/master/architecture/recaptcha-flow.png?raw=true)

We use Cloud Build to build our container images and deploy them to Cloud Run.

## Permissions Required:
  1. Cloud Build Service Account: Cloud Run Admin
  2. Cloud Run (Default compute Engine Service Account) : reCAPTCHA Enterprise Agent.
