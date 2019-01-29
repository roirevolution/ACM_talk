# ROI Revolution Metrics and Monitors

This repo is a companion to the [Metrics and Monitoring](https://docs.google.com/presentation/d/1EnU5w80kRjuBldmZ-JvBziWpyTMj3pG8FHcVy00ZEvY/edit#slide=id.g4ddb5f2743_0_66) talk.

# Set up

## Local Development

For local development, you will want to make a local `.env` file and add the appropriate secrets. You can start with `.env.example` to find all of the variables you need to set.

```bash
cp .env.example .env
```

You will then need to update your new `.env` file with real values.

## Deployment

This application can easily deploy to [Heroku](https://www.heroku.com/). You will need to [follow Heroku's instructions](https://devcenter.heroku.com/articles/config-vars) for updating config/environmental variables.