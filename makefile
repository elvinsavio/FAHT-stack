# Project Settings
SESSION_NAME = dev_stack
PROJECT_DIR  = $(shell pwd)

# Commands
FLASK_CMD    = uv run flask run --debug
TAILWIND_CMD = npm run watch
CLAUDE_CMD   = claude .
EDITOR_CMD   = code .

.PHONY: dev stop

dev:
	@# 1. Create the session and start Flask in the first window
	@tmux has-session -t $(SESSION_NAME) 2>/dev/null || \
		(tmux new-session -d -s $(SESSION_NAME) -n "flask" -c $(PROJECT_DIR) && \
		 tmux send-keys -t $(SESSION_NAME):flask "$(FLASK_CMD)" C-m)

	@# 2. Create a second window for Tailwind
	@tmux list-windows -t $(SESSION_NAME) | grep -q "tailwind" || \
		(tmux new-window -t $(SESSION_NAME) -n "tailwind" -c $(PROJECT_DIR) && \
		 tmux send-keys -t $(SESSION_NAME):tailwind "$(TAILWIND_CMD)" C-m)

	@# 3. Create a third window for Claude
	@tmux list-windows -t $(SESSION_NAME) | grep -q "claude" || \
		(tmux new-window -t $(SESSION_NAME) -n "claude" -c $(PROJECT_DIR) && \
		 tmux send-keys -t $(SESSION_NAME):claude "$(CLAUDE_CMD)" C-m)

	@# 4. Open VS Code
	@$(EDITOR_CMD)

	@# 5. Immediately open the tmux session
	@tmux attach -t $(SESSION_NAME)

stop:
	@tmux kill-session -t $(SESSION_NAME) 2>/dev/null || true
	@echo "Session $(SESSION_NAME) stopped."
