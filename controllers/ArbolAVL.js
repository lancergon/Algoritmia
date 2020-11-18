function ArbolBinario(){
    this.root = null
    this.current = this.root
  }
  
  function Node(value){
    this.value=value
    this.left=null
    this.right=null
    this.height=0
    this.repeat=[];
  }
  
  ArbolBinario.prototype.insert=function(parent, newValue){
    if(parent.value.Venta==newValue.value.Venta){
      parent.repeat.push(newValue.value);
      
    }else{

      if(parent.value.Venta<newValue.value.Venta){
        if(parent.right&&parent.right.value){
          this.insert(parent.right, newValue)
        }else{
          parent.right=newValue
        }
      }else{
        if(parent.left&&parent.left.value){
          this.insert(parent.left, newValue)
        }else{
          parent.left=newValue
        }
      }
    }
  
    }

  
  
  ArbolBinario.prototype.add=function(value){
    const newValue = new Node(value)
    if(!this.root){
      this.root=newValue
      return "Arbol inicializado"
    }else{
      this.insert(this.root, newValue)
  
    }
    this.getHeight(this.root)
    this.root=this.checkBalance(this.root)
  }
  
  ArbolBinario.prototype.balancear=function(parent){
    if(parent.height>1 && parent.right && (parent.right.height>1||parent.right.height<-1)){
      parent.right = this.balancear(parent.right)
    }else if(parent.height<-1 && parent.left && (parent.left.height<-1||parent.left.height>1)){
      parent.left = this.balancear(parent.left)
    }else if(parent.height<0 &&parent.left.height===-1){
      if(parent.left.right){
        var saveRight = parent.left.right
      }
      if(parent.left.left){
        var saveLeft =parent.left.left
      }
      parent.left.right = new Node(parent.value)
      parent.left.right.repeat=parent.repeat
      parent.left.right.right=parent.right
      parent =parent.left
      parent.right.left=saveRight
      parent.left =saveLeft
    }else if(parent.height<0 &&parent.left.height===1){
      if(parent.left.right.left){
        var saveLeft = parent.left.right.left
      }if(parent.left.right.right){
        var saveRight = parent.left.right.right
      }
      parent.left.right.right = new Node(parent.value)
      parent.left.right.right.repeat=parent.repeat
      parent.left.right.right.right = parent.right
      parent.left.right.left = new Node(parent.left.value)
      parent.left.right.left.repeat=parent.left.repeat
      parent.left.right.left.left=parent.left.left
      parent =parent.left.right
      parent.left.right = saveLeft
      parent.right.left = saveRight
    }else if(parent.height>0 &&parent.right.height===1){
      if(parent.right.left){
        var saveLeft =parent.right.left
      }if(parent.right.right){
        var saveRight = parent.right.right
      }
      parent.right.left = new Node(parent.value)
      parent.right.left.repeat=parent.repeat
      parent.right.left.left =parent.left
      parent = parent.right
      parent.left.right = saveLeft
      parent.right=saveRight
  
    }else if(parent.height>0 &&parent.right.height===-1){
      if(parent.right.left.right){
        var saveRight = parent.right.left.right
      }
      if(parent.right.left.left){
        saveLeft=parent.right.left.left
      }
      parent.right.left.left = new Node(parent.value)
      parent.right.left.left.repeat=parent.repeat
      parent.right.left.right = new Node(parent.right.value)
      parent.right.left.right.repeat=parent.right.repeat
      parent.right.left.right.right=parent.right.right
      parent.right.left.left.left = parent.left
      parent =parent.right.left
      parent.right.left = saveRight
      parent.left.right =saveLeft
    }
  
    return parent
  
  }
  
  ArbolBinario.prototype.search=function(n){
    this.current = this.root;
    return this.find(n)
  }
  
  ArbolBinario.prototype.find=function(x){
    if(this.current && this.current.value.Venta == x){
      console.log(this.current.repeat)
      return this.current.repeat.concat(this.current.value)
    }else if( this.current && this.current.value.Venta<x){
        this.current = this.current.right
        return this.find(x)
    }else if(this.current && this.current.value.Venta>x){
      this.current = this.current.left
      return this.find(x)
    }

    return false
  }


  

  ArbolBinario.prototype.hasLeft = function(node){
    return !!node.left
  }
  ArbolBinario.prototype.farestLeft=function(node){
    if(this.hasLeft(node)){
      return this.farestLeft(node.left)
    }
    return node
  }
  
  ArbolBinario.prototype.delete=function(x){
    const deleted = this.search(x)
    if(deleted.right){
      var ascended = this.farestLeft(deleted.right)
      this.delete(ascended.value)
      deleted.value = ascended.value
    }else if(deleted.left){
      deleted.value=deleted.left.value
      deleted.right =deleted.left.right
      deleted.left=deleted.left.left
    }else{
      this.findNodeAndDestroy(deleted)
    }
  }
  
  ArbolBinario.prototype.findNodeAndDestroy=function(node){
    this.current = this.root
    while(true){
      if(node.value<this.current.value){
        if(this.current.left === node){
          this.current.left = null
          break
        }else{
          this.current=this.current.left
        }
      }else if(node.value>this.current.value){
        if(this.current.right === node){
          this.current.right = null
          break
        }else{
          this.current = this.current.right
        }
      }
    }
  }
  
  
  ArbolBinario.prototype.getHeight=function(node){
    node.height=0
    var heightRight=0
    var heightLeft=0
    if(node.left){
      heightLeft-=this.getHeight(node.left)
    }
    if(node.right){
      heightRight+=this.getHeight(node.right)
    }
    node.height=heightRight+heightLeft
  
    return Math.max(heightRight, Math.abs(heightLeft))+1
  }
  
  ArbolBinario.prototype.checkBalance = function(node){
    if(node.left){
      node.left = this.checkBalance(node.left)
    }
    if(node.right){
      node.right=this.checkBalance(node.right)
    }
    this.getHeight(this.root)
    if(node.height>1 || node.height<-1){
      node = this.balancear(node)
      this.getHeight(this.root)
      node=this.checkBalance(node)
      }
    return node
  }