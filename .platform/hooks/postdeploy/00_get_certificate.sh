#!/usr/bin/env bash
# Place in .platform/hooks/postdeploy directory
sudo certbot -n -d test2imsotired.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email gabbolm@icloud.com
