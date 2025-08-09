<!-- prompt to create this readme file is:
"
use install_k6.txt and install_node_go.txt files to generate project setup instructions for repository readme file
"
 -->


# K6 Performance Testing Lab

A performance testing lab that compares Go and Node.js implementations of a simple TODO API using k6 for load testing.

## Project Overview

This project contains:
- **Go implementation** (`main.go`) - A simple HTTP server with TODO CRUD operations
- **Node.js implementation** (`main.js`) - Equivalent functionality using Node.js
- **K6 test scripts** (`index.js`) - Performance testing scenarios
- **Results directory** - Contains performance test results for both implementations

## Prerequisites

Before setting up this project, ensure you have the following installed:

### 1. Install K6

#### For RHEL/CentOS/Amazon Linux:
```bash
# Using dnf (RHEL 8+, CentOS 8+)
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6

# Using yum (older versions)
sudo yum install https://dl.k6.io/rpm/repo.rpm
sudo yum install k6
```

### 2. Install Go

#### For RHEL/CentOS/Amazon Linux:
```bash
sudo yum update -y
sudo yum install -y golang
```

#### For Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install golang-go
```

### 3. Install Node.js

#### Using NVM (Recommended):
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

### 4. Install Git

#### For RHEL/CentOS/Amazon Linux:
```bash
sudo yum install git -y
```

### 5. Install GitHub CLI (Optional)

```bash
# For RHEL/CentOS/Amazon Linux
type -p yum-config-manager >/dev/null || sudo yum install yum-utils
sudo yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
sudo yum install gh

After installation, authenticate:
```bash
gh auth login
```

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd k6_lab
   ```

2. **Verify installations:**
   ```bash
   k6 version
   go version
   node --version
   npm --version
   ```

## Running the Applications

### Start the Go Server

```bash
# Set port (optional, defaults to 8081)
export PORT=8080

# Run the Go server
go run main.go
```

The Go server will start on port 8081 (or the specified PORT environment variable).

### Start the Node.js Server

```bash
# Set port (optional, defaults to 3000)
export PORT=8080

# Run the Node.js server
node main.js
```

The Node.js server will start on the specified PORT or default to 3000.

## Running Performance Tests

### Using the provided scripts:

```bash
# Test Go implementation
chmod +x run_go.sh
./run_go.sh

# Test Node.js implementation
chmod +x run_node.sh
./run_node.sh
```

### Manual k6 execution:

```bash
# Single test run
k6 run index.js

# With custom options
k6 run --vus 100 --duration 30s index.js

# Export results
k6 run --summary-export=results/test_run.json index.js
```

## API Endpoints

Both implementations provide the same API endpoints:

- `GET /todos` - Retrieve all todos
- `POST /todos` - Create a new todo (requires JSON body with `task` field)
- `DELETE /todos` - Delete all todos
- `GET /` - Welcome message

### Example usage:

```bash
# Create a todo
curl -X POST http://localhost:8081/todos \
  -H "Content-Type: application/json" \
  -d '{"task": "Test performance"}'

# Get all todos
curl http://localhost:8081/todos

# Delete all todos
curl -X DELETE http://localhost:8081/todos
```

## Test Configuration

The k6 test script (`index.js`) is configured with:
- **Virtual Users**: 50
- **Duration**: 20 seconds
- **Target**: POST requests to `/todos` endpoint

Modify these settings in `index.js` to adjust test parameters.

## Results

Test results are automatically saved to:
- `results/go/` - Go implementation test results
- `results/node/` - Node.js implementation test results

Each test run generates a JSON file with performance metrics.

## Troubleshooting

### Common Issues:

1. **Port already in use**: Change the PORT environment variable
2. **Permission denied**: Ensure scripts are executable (`chmod +x *.sh`)
3. **k6 not found**: Verify k6 installation and PATH configuration
4. **Go modules**: Run `go mod init` if needed

### Verification Commands:

```bash
# Check if ports are available
netstat -tulpn | grep :8081
netstat -tulpn | grep :8080

# Check k6 installation
which k6
k6 version

# Check Go installation
which go
go version

# Check Node.js installation
which node
node --version
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]

p.s. there are directory 'results', inside it there are 'go' and 'node' directories, if you are going to make performance test yourself, remove existing json results.